"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/user/user.route.ts
const express_1 = require("express");
const user_controller_1 = require("./user.controller"); // সঠিকভাবে userController ইম্পোর্ট করা হয়েছে
const router = (0, express_1.Router)();
// POST route
router.post("/users", user_controller_1.userController.createUser); // Example route for creating a user
router.post("/signup", user_controller_1.userController.createUser); // createUser ফাংশনটি সঠিকভাবে পাস করা হয়েছে
exports.default = router;
