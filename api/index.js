import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("API is working 🚀");
});

// Inngest route
app.use("/inngest", serve({ client: inngest, functions }));

// ✅ FIXED HANDLER
let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
}