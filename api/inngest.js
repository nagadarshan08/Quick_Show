import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import functions from "../inngest/functions.js";
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not found");
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export default async function handler(req, res) {
  try {
    await connectDB();

    return serve({
      client: inngest,
      functions,
    })(req, res);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}