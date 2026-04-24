import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing ❌");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;
  console.log("MongoDB Connected ✅");
};

export default connectDB;