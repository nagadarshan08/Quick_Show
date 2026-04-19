import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);

    console.log("MongoDB Connected ✅");

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Error ❌", err);
    });

  } catch (error) {
    console.log("Connection Failed ❌", error.message);
  }
};

export default connectDB;