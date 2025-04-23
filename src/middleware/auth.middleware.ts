import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Token যাচাইয়ের ফাংশন
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // হেডারে টোকেন চেক করা
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied. No Token Provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // টোকেন ডিকোড করা তথ্য req.user তে সংরক্ষণ
    next(); // পরবর্তী রাউট হ্যান্ডলার কল
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
};
