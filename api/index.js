import express from "express";
import mongoose from "mongoose";
import { serve } from "inngest/express";

import { inngest } from "./innjest.js";
import { functions } from "./innjest.js";

const app = express();
app.use(express.json());

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
  }
};

connectDB();

// ✅ Inngest route (VERY IMPORTANT)
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

export default app;