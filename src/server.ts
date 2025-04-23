import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
