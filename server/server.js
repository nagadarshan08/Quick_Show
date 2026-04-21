import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";

import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { userCreated } from "./inngest/functions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/users", userRoutes);

// Inngest route
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [userCreated]
  })
);

app.get("/", (req, res) => {
  res.send("Local Server Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});