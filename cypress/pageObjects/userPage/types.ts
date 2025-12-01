import { ResponseEmployee } from "@pageObjects/employeePage/types";
import { USER_ROLE } from "./constants";

export type UserRole = keyof typeof USER_ROLE;

export type NewUser = {
  empNumber: number;
  username: string;
  password: string;
  status: boolean;
  userRole: UserRole;
};

export interface UserRoleResponse {
  id: number;
  name: string;
  displayName: string;
}

export interface ResponseUser {
  id: number;
  userName: string;
  deleted: boolean;
  status: boolean;
  employee: ResponseEmployee;
  userRole: UserRoleResponse;
}
