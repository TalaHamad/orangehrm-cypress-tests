import { USER_ROLE } from "./constants";
import { NewUser } from "./types";

export const mapUserToCreateRequest = (user: NewUser) => {
  return {
    empNumber: user.empNumber,
    username: user.username,
    password: user.password,
    status: user.status,
    userRoleId: USER_ROLE[user.userRole],
  };
};
