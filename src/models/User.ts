// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// ইন্টারফেস
export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  role?: string;
}

// মডেল ইন্টারফেস
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// স্কিমা
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "employee" },
  },
  { timestamps: true }
);

// ✅ পাসওয়ার্ড হ্যাশ করার জন্য pre-save hook
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  // ✅ লগ দেখার জন্য
  console.log("🛠️ পাসওয়ার্ড হ্যাশ করা হচ্ছে:", this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // ✅ হ্যাশ করার পরও দেখতে চাইলে:
  console.log("✅ হ্যাশ করা পাসওয়ার্ড:", this.password);
  next();
});

// ✅ findOneAndUpdate এর জন্যও হ্যাশিং
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
  next();
});

// ✅ পাসওয়ার্ড যাচাই করার method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// ✅ মডেল এক্সপোর্ট
export default mongoose.models.User ||
  mongoose.model<IUserDocument>("User", UserSchema);
