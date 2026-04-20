import express from "express";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

// ❌ REMOVE THIS (Vercel does not support it)
// app.listen(3000, () => {
//   console.log("Server running");
// });

// ✅ IMPORTANT: Export app
export default app;