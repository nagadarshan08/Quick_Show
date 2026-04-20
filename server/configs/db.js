import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // MUST be here

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI); // DEBUG

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
  }
};

export default connectDB;