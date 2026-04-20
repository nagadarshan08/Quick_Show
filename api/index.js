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

// Inngest
app.use("/inngest", serve({ client: inngest, functions }));

// ✅ Safe DB connection for Vercel
let isConnected = false;

const connect = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// ✅ Final export
export default async (req, res) => {
  await connect();
  return app(req, res);
};