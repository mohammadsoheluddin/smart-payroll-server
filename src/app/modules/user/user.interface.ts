export type IUserRole = "admin" | "employee";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: IUserRole;
}
