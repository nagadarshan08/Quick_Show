import express from "express";
import mongoose from "mongoose";
import { serve } from "inngest/express";

// ✅ import both
import { inngest } from "./inngest/index.js";
import { functions } from "./inngest/index.js";

const app = express();
app.use(express.json());

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

// ✅ THIS IS THE MOST IMPORTANT PART
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default app;