import express from "express";
import cors from "cors";

import connectDB from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Vercel API is running...");
});

export default app;