import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);