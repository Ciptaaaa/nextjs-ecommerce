// import mongoose from "mongoose";
// // import playground from "playground-1.";

// export async function initMongoose() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   }
//
import mongoose from "mongoose";
import dotenv from "dotenv";

//memuat data dari .env
dotenv.config();

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(process.env.MONGODB_URL);
  // return await mongoose.connect(
  //   "mongodb+srv://eka_cipta:diazekacipta$@test-ecommerce.4ormt.mongodb.net/test-ecommerce"
  // );
}
