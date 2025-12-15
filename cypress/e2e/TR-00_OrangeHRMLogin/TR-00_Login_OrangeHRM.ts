import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPageActions from "../../pageObjects/loginPage/actions";
import LoginPageAssertions from "../../pageObjects/loginPage/assertions";
import DashboardPageAssertions from "../../pageObjects/dashboardPage/assertions";

Given("User is on the OrangeHRM login page", () => {
  LoginPageActions.visitLoginPage();
});

When("User enters username {string}", (username: string) => {
  LoginPageActions.enterUsername(username);
});

When("User enters password {string}", (password: string) => {
  LoginPageActions.enterPassword(password);
});

When("User clicks the login button", () => {
  LoginPageActions.clickLoginButton();
});

Then("User should be redirected to the dashboard", () => {
  DashboardPageAssertions.checkDashboardHeaderText();
});

When("User leaves username field empty", () => {});

When("User leaves password field empty", () => {});

When("User leaves both username and password fields empty", () => {});

Then("User should see username required error message", () => {
  LoginPageAssertions.checkUsernameRequiredError();
});

Then("User should see password required error message", () => {
  LoginPageAssertions.checkPasswordRequiredError();
});

Then("User should see both fields required error message", () => {
  LoginPageAssertions.checkBothFieldsRequiredError();
});

Then('User should see "Invalid credentials" error message', () => {
  LoginPageAssertions.checkInvalidCredentialsError();
});

When('User clicks on the "Forgot your password?" link', () => {
  LoginPageActions.clickForgotPasswordLink();
});

Then("User should be redirected to the password reset page", () => {
  LoginPageAssertions.checkResetPasswordHeader();
});
