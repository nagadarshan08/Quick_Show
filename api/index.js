import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
await connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Vercel API running...");
});

// ❌ NO app.listen() in Vercel
export default app;