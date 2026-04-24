import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import functions from "../inngest/functions.js";
import mongoose from "mongoose";

// ✅ Connect DB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(process.env.MONGO_URI);
};

export default async function handler(req, res) {
  await connectDB();

  return serve({
    client: inngest,
    functions,
  })(req, res);
}