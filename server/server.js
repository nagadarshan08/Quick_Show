import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

// Connect DB (no await here)
connectDB().then(() => console.log("DB Connected"));

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => res.send("Server is live.."));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

export default app;