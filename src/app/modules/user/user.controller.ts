// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { createUser } from "./user.service"; // সঠিকভাবে ইম্পোর্ট করা হয়েছে

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const result = await createUser(req.body);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error: any) {
      // এখানে error কে any টাইপে কাস্ট করেছি
      res.status(500).json({
        success: false,
        message: error.message, // এখন error.message অ্যাক্সেস করা যাবে
      });
    }
  },

  // অন্যান্য ফাংশন যেমন getUserData বা অন্য কিছু থাকতে পারে
};
