import { Request, Response } from "express";
import User from "../../../models/User";
import generateToken from "../../../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "ইউজার ইতোমধ্যে বিদ্যমান" });
    }

    const user = await User.create({ name, email, username, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "সার্ভার ত্রুটি", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "ইউজারনেম বা পাসওয়ার্ড ভুল" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    res.status(500).json({ message: "সার্ভার ত্রুটি", error });
  }
};
