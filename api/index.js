import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

// Connect DB (NO await in Vercel)
connectDB().then(() => console.log("DB Connected"));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ROOT route → VERY IMPORTANT
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// Inngest route
app.use("/inngest", serve({ client: inngest, functions }));

export default app;