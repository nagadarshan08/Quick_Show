import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

// Connect DB
await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("API is working 🚀");
});

// Inngest route
app.use("/inngest", serve({ client: inngest, functions }));

// ✅ Vercel handler (IMPORTANT)
export default function handler(req, res) {
  return app(req, res);
}