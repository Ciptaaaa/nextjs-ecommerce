import mongoose from "mongoose";
import dotenv from "dotenv";

//memuat data dari .env
dotenv.config();

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  return await mongoose.connect(process.env.MONGODB_URL);
}
