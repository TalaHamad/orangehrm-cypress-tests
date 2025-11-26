import { USER_ROLE } from "./constants";

export type UserRole = keyof typeof USER_ROLE;

export type NewUser = {
  empNumber: number;
  username: string;
  password: string;
  status: boolean;
  userRole: UserRole;
};
