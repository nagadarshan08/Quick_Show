import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// 👇 THIS IS THE FIX
export default (req, res) => {
  return app(req, res);
};