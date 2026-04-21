import express from "express";
import User from "../models/User.js";

const router = express.Router();

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USERS
router.get("/add", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@gmail.com"
  });
  res.json(user);
});

export default router;