// src/routes/protected.route.ts
import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.get("/protected", authenticateToken, (req: Request, res: Response) => {
  const user = (req as Request & { user?: string | JwtPayload }).user;
  res.json({ message: "This is a protected route", user });
});

router.get("/profile", authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({
    message: "প্রমাণীকৃত ব্যবহারকারীর প্রোফাইল তথ্য",
    user: req.user,
  });
});

router.get("/search", authenticateToken, (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ message: "অনুগ্রহ করে অনুসন্ধান শব্দ প্রদান করুন" });
    return;
  }

  // বাস্তবে এখানে ডেটাবেস অনুসন্ধান করা হবে
  res.status(200).json({ message: `"${query}" অনুসন্ধান ফলাফল`, data: [] });
});

export default router;
