import { getFullUrl } from "@support/utils";
import { NewUser, ResponseUser } from "./types";
import { mapUserToCreateRequest } from "./mappers";

export default class UserDataUtils {
  static createUser(user: NewUser) {
    return cy
      .request(
        "POST",
        getFullUrl({
          page: "admin",
          endpoint: "users",
        }),
        mapUserToCreateRequest(user)
      )
      .then((response) => response.body.data.id);
  }

  static getUsers(): Cypress.Chainable<ResponseUser[]> {
    return cy
      .request(
        "GET",
        getFullUrl({
          page: "admin",
          endpoint: "users",
        })
      )
      .then((response) => response.body.data);
  }

  static getUserByUsername(userName: string): Cypress.Chainable<ResponseUser> {
    return this.getUsers().then((users: ResponseUser[]) => {
      const foundUser = users.find(
        (user: ResponseUser) => user.userName === userName
      );
      return foundUser;
    });
  }

  static deleteUser(userName: string) {
    this.getUserByUsername(userName).then((foundUser: ResponseUser) => {
      if (foundUser) {
        cy.request({
          method: "DELETE",
          url: getFullUrl({
            page: "admin",
            endpoint: "users",
          }),
          body: {
            ids: [foundUser.id],
          },
        });
      }
    });
  }
}
