"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service"); // সঠিকভাবে ইম্পোর্ট করা হয়েছে
exports.userController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield (0, user_service_1.createUser)(req.body);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: result,
            });
        }
        catch (error) {
            // এখানে error কে any টাইপে কাস্ট করেছি
            res.status(500).json({
                success: false,
                message: error.message, // এখন error.message অ্যাক্সেস করা যাবে
            });
        }
    }),
    // অন্যান্য ফাংশন যেমন getUserData বা অন্য কিছু থাকতে পারে
};
