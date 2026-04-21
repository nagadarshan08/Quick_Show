import express from "express";

const router = express.Router();

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    // Temporary response (replace with DB later)
    res.json([
      { name: "Darshan", role: "Developer" }
    ]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;