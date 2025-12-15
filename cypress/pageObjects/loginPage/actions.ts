import { getFullUrl } from "@support/utils";

export default class LoginPageActions {
  static visitLoginPage() {
    cy.visit("/");
    return this;
  }

  static enterUsername(username: string) {
    cy.get('input[name="username"]').clear().type(username);
    return this;
  }

  static enterPassword(password: string) {
    cy.get('input[name="password"]').clear().type(password);
    return this;
  }

  static clickLoginButton() {
    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "employees/time-at-work?**",
      })
    ).as("timeAtWork");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "employees/action-summary",
      })
    ).as("actionSummary");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "employees/leaves?**",
      })
    ).as("employeeLeaves");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "shortcuts",
      })
    ).as("shortcuts");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "employees/subunit",
      })
    ).as("employeeSubunit");

    cy.intercept("POST", `/web/index.php/events/push`).as("eventsPush");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "dashboard",
        endpoint: "employees/locations",
      })
    ).as("employeeLocations");

    cy.get('button[type="submit"]').click();

    cy.wait("@timeAtWork");
    cy.wait("@actionSummary");
    cy.wait("@employeeLeaves");
    cy.wait("@shortcuts");
    cy.wait("@employeeSubunit");
    cy.wait("@eventsPush");
    cy.wait("@employeeLocations");

    return this;
  }

  static clickForgotPasswordLink() {
    cy.get(".orangehrm-login-forgot-header").click();
    return this;
  }
}
