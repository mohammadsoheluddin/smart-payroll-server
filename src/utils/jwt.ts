import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// JWT_SECRET ভ্যালুকে string টাইপে কাস্ট করুন
const secret: string = process.env.JWT_SECRET as string;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// JWT টোকেন তৈরি করার ফাংশন
export const createToken = (
  payload: Record<string, unknown>,
  expiresIn: string | number = "1h"
): string => {
  const options: SignOptions = {
    expiresIn: "7D",
  };

  return jwt.sign(payload, secret, options);
};

// JWT টোকেন ভেরিফাই করার ফাংশন
export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, secret);
};
