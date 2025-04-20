import { Document, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
}
