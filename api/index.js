import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../server/configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

// connect DB
await connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// routes
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

export default app;