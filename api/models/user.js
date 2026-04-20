import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String,
  email: String,
  name: String,
  image: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);