// // pages/api/products/suggested.js
// import { initMongoose } from "../../lib/mongoose";
// import Product from "../../models/Product";

// export default async function handler(req, res) {
//   try {
//     await initMongoose();

//     // Ambil semua produk dari database
//     const allProducts = await Product.find().exec();
//     console.log("All Products:", allProducts); // Debugging

//     // Ambil produk yang disarankan
//     const suggestedProducts = allProducts.filter(
//       (product) => product.isSuggested
//     );

//     console.log("Suggested Products:", suggestedProducts); // Debugging

//     if (suggestedProducts.length === 0) {
//       return res.status(404).json({ message: "No suggested products found." });
//     }

//     res.status(200).json(suggestedProducts);
//   } catch (error) {
//     console.error("Error fetching suggested products:", error);
//     res.status(500).json({ error: error.message });
//   }
// }
