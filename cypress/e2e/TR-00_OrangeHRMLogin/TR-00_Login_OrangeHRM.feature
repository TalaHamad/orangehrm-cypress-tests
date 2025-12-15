Feature: OrangeHRM Login Functionality

  Background:
    Given User is on the OrangeHRM login page

  @positive @login
  Scenario: Successful login with valid credentials
    When User enters username "Admin"
    And User enters password "admin123"
    And User clicks the login button
    Then User should be redirected to the dashboard

  @negative @login @validation
  Scenario: Required field validation for empty username
    When User leaves username field empty
    And User enters password "admin123"
    And User clicks the login button
    Then User should see username required error message

  @negative @login @validation
  Scenario: Required field validation for empty password
    When User enters username "Admin"
    And User leaves password field empty
    And User clicks the login button
    Then User should see password required error message

  @negative @login @validation
  Scenario: Required field validation for both empty fields
    When User leaves both username and password fields empty
    And User clicks the login button
    Then User should see both fields required error message

  @negative @login @credentials
  Scenario Outline: Invalid credentials show authentication error
    When User enters username "<username>"
    And User enters password "<password>"
    And User clicks the login button
    Then User should see "Invalid credentials" error message

    Examples:
      | username        | password        |
      | invalidusername | invalidpassword |
      | Admin           | wrongpass       |
      | invalidusername | admin123        |

  @forgot-password @login
  Scenario: Access forgot password functionality
    When User clicks on the "Forgot your password?" link
    Then User should be redirected to the password reset page