"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// পূর্বের প্রোটেক্টেড রুট
router.get("/protected", auth_middleware_1.authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});
// নতুন প্রোফাইল রুট
router.get("/profile", auth_middleware_1.authenticateToken, (req, res) => {
    res.status(200).json({
        message: "প্রমাণীকৃত ব্যবহারকারীর প্রোফাইল তথ্য",
        user: req.user,
    });
});
// নতুন সার্চ রুট
router.get("/search", auth_middleware_1.authenticateToken, (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res
            .status(400)
            .json({ message: "অনুগ্রহ করে অনুসন্ধান শব্দ প্রদান করুন" });
    }
    // এখানে ডেটাবেজ অনুসন্ধান যুক্ত করুন
    res.status(200).json({ message: `"${query}" অনুসন্ধান ফলাফল`, data: [] });
});
exports.default = router;
