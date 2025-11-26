import {
  getFullBuzzUrl,
  getFullDashboardUrl,
  getFullEventsUrl,
} from "@support/utils";

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
    cy.intercept("GET", getFullDashboardUrl("employees/time-at-work?**")).as(
      "timeAtWork"
    );
    cy.intercept("GET", getFullDashboardUrl("employees/action-summary")).as(
      "actionSummary"
    );
    cy.intercept("GET", getFullDashboardUrl("employees/leaves?**")).as(
      "employeeLeaves"
    );
    cy.intercept("GET", getFullDashboardUrl("shortcuts")).as("shortcuts");
    cy.intercept("GET", getFullBuzzUrl("feed?**")).as("buzzFeed");
    cy.intercept("GET", getFullDashboardUrl("employees/subunit")).as(
      "employeeSubunit"
    );
    cy.intercept("POST", getFullEventsUrl("push")).as("eventsPush");
    cy.intercept("GET", getFullDashboardUrl("employees/locations")).as(
      "employeeLocations"
    );

    cy.get('button[type="submit"]').click();

    // cy.wait("@timeAtWork");
    // cy.wait("@actionSummary");
    // cy.wait("@employeeLeaves");
    // cy.wait("@shortcuts");
    // cy.wait("@buzzFeed");
    // cy.wait("@employeeSubunit");
    // cy.wait("@eventsPush");
    // cy.wait("@employeeLocations");

    cy.wait([
      "@timeAtWork",
      "@actionSummary",
      "@employeeLeaves",
      "@shortcuts",
      "@buzzFeed",
      "@employeeSubunit",
      "@eventsPush",
      "@employeeLocations",
    ]);

    return this;
  }

  static clickForgotPasswordLink() {
    cy.get(".orangehrm-login-forgot-header").click();
    return this;
  }
}
