import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ Connect DB safely (NO top-level await)
let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Root route
app.get("/", async (req, res) => {
  await connectDatabase();
  res.status(200).send("API is working 🚀");
});

// Inngest route
app.use("/inngest", async (req, res) => {
  await connectDatabase();
  return serve({ client: inngest, functions })(req, res);
});

// ✅ Vercel handler
export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}