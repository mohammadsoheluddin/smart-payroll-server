import express from "express";
import dotenv from "dotenv";
import userRoutes from "./app/modules/user/user.route";
import protectedRoutes from "./routes/protected.route"; // প্রটেক্টেড রাউট ইম্পোর্ট
import authRoutes from "../src/routes/auth.routes";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/protected", protectedRoutes); // প্রটেক্টেড রাউট এখানে যুক্ত
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Smart Payroll API!");
});

export default app;
