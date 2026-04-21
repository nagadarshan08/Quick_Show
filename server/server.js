import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("Server is live.."));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start server ONLY after DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });

export default app;