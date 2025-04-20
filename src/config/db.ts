// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connecting Problem:", error);
    process.exit(1);
  }
};

export default connectDB;
