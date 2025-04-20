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
exports.createUser = exports.getUser = void 0;
const user_model_1 = require("./user.model"); // যদি আপনার মডেল থাকে
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // এখানে User মডেলটি ব্যবহার করে ইউজারের তথ্য ফেচ করা হবে
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error("Error fetching user");
    }
});
exports.getUser = getUser;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // এখানে ইউজার তৈরি করার ফাংশন
    const newUser = new user_model_1.User(userData);
    yield newUser.save();
    return newUser;
});
exports.createUser = createUser;
