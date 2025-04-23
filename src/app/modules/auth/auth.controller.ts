import { Request, Response } from "express";
import User, { IUser } from "../../../models/user.model";
import jwt from "jsonwebtoken";

const generateToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser: IUser = new User({ name, email, password });
    const savedUser: IUser = await newUser.save();

    const token = generateToken(savedUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as IUser | null;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
