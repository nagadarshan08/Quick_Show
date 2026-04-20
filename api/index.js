import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import connectDB from "../server/configs/db.js";
import { inngest, functions } from "../server/inngest/index.js";

const app = express();

// ✅ Connect DB
await connectDB();

// ✅ Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Inngest route
app.use("/inngest", serve({ client: inngest, functions }));

// ✅ REQUIRED for Vercel
export default app;