import { initMongoose } from "../../lib/mongoose";
import Order from "../../models/Order";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// localhost:3000/api/webhook
export default async function handler(req, res) {
  await initMongoose();
  const signingSecret =
    "whsec_e7c82ae108347454fc911ffdcee62561f282aea264dfd782ea49b4cb7396d966";
  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  if (event?.type === "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === "paid") {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
