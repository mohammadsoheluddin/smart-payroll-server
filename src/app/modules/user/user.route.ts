// src/modules/user/user.route.ts
import { Router } from "express";
import { userController } from "./user.controller"; // সঠিকভাবে userController ইম্পোর্ট করা হয়েছে

const router = Router();

// POST route
router.post("/users", userController.createUser); // Example route for creating a user
router.post("/signup", userController.createUser); // createUser ফাংশনটি সঠিকভাবে পাস করা হয়েছে

export default router;
