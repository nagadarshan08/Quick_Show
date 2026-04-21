import express from "express";
import User from "../models/User.js";
import { inngest } from "../inngest/client.js";

const router = express.Router();

// Create user + trigger Inngest
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // trigger event instead of direct DB write
    await inngest.send({
      name: "user/created",
      data: { name, email }
    });

    res.json({ message: "User event sent to Inngest" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;