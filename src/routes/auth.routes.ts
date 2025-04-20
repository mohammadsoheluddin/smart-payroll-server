// src/routes/auth.ts
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User"; // ইউজার মডেল

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "S0m3$Up3r$3creT@Key2025";

// ✅ রেজিস্ট্রেশন রুট
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  try {
    // একই ইমেইল বা ইউজারনেম আছে কিনা চেক করো
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        message: "ইউজারনেম বা ইমেইল ইতোমধ্যে ব্যবহৃত হয়েছে",
      });
    }

    // এখানে save করার সময় মডেল ফাইলে থাকা pre("save") হুক পাসওয়ার্ড হ্যাশ করে দেবে
    const newUser = new User({ name, email, username, password });
    await newUser.save();

    res.status(201).json({ message: "রেজিস্ট্রেশন সফল হয়েছে" });
  } catch (err) {
    res.status(500).json({ message: "সার্ভার ত্রুটি", error: err });
  }
});

// ✅ লগইন রুট
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "ইউজারনেম বা পাসওয়ার্ড ভুল" });
    }

    // 👇 এখানে টাইপ কাস্ট করে নাও যাতে comparePassword ব্যবহার করা যায়
    const userWithMethod = user as typeof user & {
      comparePassword(candidatePassword: string): Promise<boolean>;
    };

    const isMatch = await userWithMethod.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "ইউজারনেম বা পাসওয়ার্ড ভুল" });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "সার্ভার ত্রুটি", error: err });
  }
});

export default router;
