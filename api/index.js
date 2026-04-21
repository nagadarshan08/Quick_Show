import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import app from "../server/server.js";


import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";

dotenv.config(); // 🔥 ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Vercel API running...");
});

export default app;