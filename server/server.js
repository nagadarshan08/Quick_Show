import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// DB Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.use("/api/users", userRoutes);

export default app;