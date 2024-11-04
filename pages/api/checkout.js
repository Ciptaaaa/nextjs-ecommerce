import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product";
import Order from "../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.json("should a post but its not!");
    return res.status(405).json({ error: "Method not allowed" });
    jJ;
  }

  const { email, name, address, city } = req.body;
  // console.log(req.body);
  const productsIds = req.body.products.split(",");
  // console.log(productsIds);
  const uniqIds = [...new Set(productsIds)];
  const products = await Product.find({ _id: { $in: uniqIds } }).exec();
  const deliveryPrice = 1500; // convert IDR to USD

  // Validasi input di server
  if (!email || !name || !address || !city || !products) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  let line_items = [];
  for (let productId of uniqIds) {
    const quantity = productsIds.filter((id) => id === productId).length;
    const product = products.find((p) => p._id.toString() === productId);
    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
    });
  }
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "USD",
      product_data: { name: "Delivery fee" }, //harga ongkos kiriman
      unit_amount: deliveryPrice,
    },
  });

  const order = await Order.create({
    //untuk payments gateway order
    products: line_items,
    name,
    email,
    address,
    city,
    paid: 0,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: { orderId: order._id.toString() },
  });

  res.redirect(303, session.url);
}
