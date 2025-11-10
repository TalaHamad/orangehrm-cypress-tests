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
    cy.get('button[type="submit"]').click();
    return this;
  }

  static clickForgotPasswordLink() {
    cy.get(".orangehrm-login-forgot-header").click();
    return this;
  }
}
