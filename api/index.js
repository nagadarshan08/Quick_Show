import app from "../server/server.js";
import connectDB from "../server/configs/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}