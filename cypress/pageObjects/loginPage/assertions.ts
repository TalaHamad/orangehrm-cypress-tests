export default class LoginPageAssertions {
  static checkUsernameRequiredError() {
    cy.get('input[name="username"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      //.should("contain", "Required");
      .contains("Required");

    return this;
  }

  static checkPasswordRequiredError() {
    cy.get('input[name="password"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      //.should("contain", "Required");
      .contains("Required");
    return this;
  }

  static checkBothFieldsRequiredError() {
    this.checkUsernameRequiredError();
    this.checkPasswordRequiredError();
    cy.get(".oxd-input-field-error-message").should("have.length", 2);
    return this;
  }

  static checkInvalidCredentialsError() {
    //cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
    cy.contains(".oxd-alert-content-text", "Invalid credentials");
    return this;
  }

  static checkResetPasswordHeader() {
    //cy.get(".orangehrm-forgot-password-title").should("contain","Reset Password" );
    cy.contains(".orangehrm-forgot-password-title", "Reset Password");
    return this;
  }
}
