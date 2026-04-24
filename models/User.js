import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
  firstName: String,
  lastName: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);