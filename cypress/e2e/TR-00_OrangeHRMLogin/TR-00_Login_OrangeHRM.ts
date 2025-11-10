import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPageActions from "../../pageObjects/loginPage/actions";
import LoginPageAssertions from "../../pageObjects/loginPage/assertions";
import DashboardPageAssertions from "../../pageObjects/dashboardPage/assertions";

// Background step
Given("user is on the OrangeHRM login page", () => {
  LoginPageActions.visitLoginPage();
});

// Positive login steps
When("user enters username {string}", (username: string) => {
  LoginPageActions.enterUsername(username);
});

When("user enters password {string}", (password: string) => {
  LoginPageActions.enterPassword(password);
});

When("user clicks the login button", () => {
  LoginPageActions.clickLoginButton();
});

Then("user should be redirected to the dashboard", () => {
  DashboardPageAssertions.checkDashboardHeaderText();
});

// Validation steps for empty fields
When("user leaves username field empty", () => {});

When("user leaves password field empty", () => {});

When("user leaves both username and password fields empty", () => {});

Then("user should see username required error message", () => {
  LoginPageAssertions.checkUsernameRequiredError();
});

Then("user should see password required error message", () => {
  LoginPageAssertions.checkPasswordRequiredError();
});

Then("user should see both fields required error message", () => {
  LoginPageAssertions.checkBothFieldsRequiredError();
});

// Invalid credentials steps
Then('user should see "Invalid credentials" error message', () => {
  LoginPageAssertions.checkInvalidCredentialsError();
});

// Forgot password steps
When('user clicks on the "Forgot your password?" link', () => {
  LoginPageActions.clickForgotPasswordLink();
});

Then("user should be redirected to the password reset page", () => {
  LoginPageAssertions.checkResetPasswordHeader();
});
