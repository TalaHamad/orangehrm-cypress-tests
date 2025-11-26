import { getFullAdminUrl } from "@support/utils";
import { NewUser } from "./types";
import { USER_ROLE } from "./constants";

export default class UserDataUtils {
  static createUser(user: NewUser) {
    return cy
      .request("POST", getFullAdminUrl("users"), {
        empNumber: user.empNumber,
        username: user.username,
        password: user.password,
        status: user.status,
        userRoleId: USER_ROLE[user.userRole],
      })

      .then((response) => {
        return response.body.data.id;
      });
  }
}
