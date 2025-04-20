"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
// src/utils/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// JWT_SECRET ভ্যালুকে string টাইপে কাস্ট করুন
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
}
// JWT টোকেন তৈরি করার ফাংশন
const createToken = (payload, expiresIn = "1h") => {
    const options = {
        expiresIn: "7D",
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
exports.createToken = createToken;
// JWT টোকেন ভেরিফাই করার ফাংশন
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
