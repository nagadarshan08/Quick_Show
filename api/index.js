import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";

import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import functions from "../inngest/functions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", userRoutes);

// ✅ ADD THIS
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.get("/", (req, res) => {
  res.send("API running...");
});

export default app;