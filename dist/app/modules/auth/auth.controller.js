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
exports.authController = void 0;
const user_service_1 = require("../user/user.service"); // ইউজার ক্রিয়েশন থেকে
const jwt_1 = require("../../../utils/jwt");
exports.authController = {
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // login logic here
    }),
    signUpUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, user_service_1.createUser)(req.body);
        const payload = {
            userId: user._id,
            email: user.email,
        };
        const secret = process.env.JWT_SECRET;
        const expiresIn = "7d";
        const token = (0, jwt_1.createToken)(payload, secret, expiresIn);
        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            data: {
                user,
                token,
            },
        });
    }),
};
