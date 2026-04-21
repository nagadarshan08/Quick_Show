import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../server/config/db.js";
import userRoutes from "../server/routes/userRoutes.js";

import { serve } from "inngest/express";
import { inngest } from "../server/inngest/client.js";
import { userCreated } from "../server/inngest/functions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ SAFE DB CONNECT
await connectDB();

// routes
app.use("/api/users", userRoutes);

// inngest
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [userCreated]
  })
);

app.get("/", (req, res) => {
  res.send("Vercel API Running 🚀");
});

export default app;