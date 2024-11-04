// // scripts/updateSuggestedProducts.js
// // import { initMongoose } from "../lib/mongoose";
// import Product from "../models/Product";

// async function addSuggestedProduct() {
//   await initMongoose();

//   const productId = "671d542fc3041fa32e06b8cf"; // Ganti dengan ID produk yang ingin Anda jadikan suggested

//   await Product.updateOne({ _id: productId }, { $set: { isSuggested: true } });

//   console.log(`Product ${productId} updated to suggested.`);
// }

// addSuggestedProduct();
