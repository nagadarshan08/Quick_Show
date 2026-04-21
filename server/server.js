import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
await connectDB();

// routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

// ❌ REMOVE app.listen
// ✅ EXPORT instead
export default app;