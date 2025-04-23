import express from "express";
import { authenticateToken } from "../middleware/auth.middleware"; // মিডলওয়্যার ইম্পোর্ট

const router = express.Router();

// প্রটেক্টেড রুট
router.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route!");
});

export default router;
