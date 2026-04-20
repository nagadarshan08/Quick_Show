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

// ✅ ROOT of this function
app.get("/", (req, res) => {
  res.status(200).send("API is working 🚀");
});

// ✅ Inngest
app.use("/inngest", serve({ client: inngest, functions }));

export default app;