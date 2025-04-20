"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // এখানে ইউজার যাচাই করুন
    const token = jsonwebtoken_1.default.sign({ username }, "your_secret_key", { expiresIn: "1h" });
    res.json({ token });
});
exports.default = router;
