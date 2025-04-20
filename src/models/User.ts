// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/IUser";

// ডকুমেন্ট টাইপ
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// স্কিমা ডেফিনিশন
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ পাসওয়ার্ড সেভ করার আগে হ্যাশ করে
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next(); // আগেই হ্যাশ করা থাকলে স্কিপ করে
  console.log("পাসওয়ার্ড হ্যাশ করা হচ্ছে..."); // এখানে লগ দিয়ে চেক করো
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("হ্যাশ পাসওয়ার্ড: ", this.password); // হ্যাশ করা পাসওয়ার্ড দেখতে
  next();
});

// ✅ পাসওয়ার্ড যাচাই করার জন্য কাস্টম মেথড
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// ✅ মডেল এক্সপোর্ট (ডেভ মোডে রি-কম্পাইল ইস্যু থেকে বাঁচতে)
export default mongoose.models.User ||
  mongoose.model<IUserDocument>("User", UserSchema);
