export default class LoginPageAssertions {
  static checkUsernameRequiredError() {
    cy.getInputByLabel("Username").parents().eq(2).contains("span", "Required");
    return this;
  }

  static checkPasswordRequiredError() {
    cy.getInputByLabel("Password").parents().eq(2).contains("span", "Required");
    return this;
  }

  static checkBothFieldsRequiredError() {
    this.checkUsernameRequiredError();
    this.checkPasswordRequiredError();
    return this;
  }

  static checkInvalidCredentialsError() {
    cy.get(".orangehrm-login-error").contains("p", "Invalid credentials");
    return this;
  }

  static checkResetPasswordHeader() {
    cy.contains(".orangehrm-forgot-password-title", "Reset Password");
    return this;
  }
}
