import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

let isConnected = false;

async function connect() {
  if (isConnected) return;

  try {
    await connectDB();
    isConnected = true;
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
}

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.status(200).send("API is working 🚀");
});

app.use("/inngest", serve({ client: inngest, functions }));

export default async function handler(req, res) {
  await connect();
  return app(req, res);
}