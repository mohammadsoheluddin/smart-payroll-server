import { User } from "./user.model"; // যদি আপনার মডেল থাকে

export const getUser = async (userId: string) => {
  try {
    // এখানে User মডেলটি ব্যবহার করে ইউজারের তথ্য ফেচ করা হবে
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const createUser = async (userData: any) => {
  // এখানে ইউজার তৈরি করার ফাংশন
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};
