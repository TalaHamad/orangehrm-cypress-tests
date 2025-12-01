import { getFullAdminUrl } from "@support/utils";
import { NewUser, ResponseUser } from "./types";
import { mapUserToCreateRequest } from "./mappers";

export default class UserDataUtils {
  static createUser(user: NewUser) {
    return cy
      .request("POST", getFullAdminUrl("users"), mapUserToCreateRequest(user))
      .then((response) => {
        return response.body.data.id;
      });
  }

  static getUsers(): Cypress.Chainable<ResponseUser[]> {
    return cy.request("GET", getFullAdminUrl("users")).then((response) => {
      return response.body.data as ResponseUser[];
    });
  }

  static filterOnUserID(userId: number): Cypress.Chainable<ResponseUser> {
    return this.getUsers().then((users: ResponseUser[]) => {
      const foundUser = users.find((user: ResponseUser) => user.id === userId);

      if (!foundUser) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return foundUser;
    });
  }

  static deleteUser(userId: number) {
    return this.filterOnUserID(userId).then((foundUser: ResponseUser) => {
      return cy.request({
        method: "DELETE",
        url: getFullAdminUrl("users"),
        body: {
          ids: [foundUser.id],
        },
      });
    });
  }
}
