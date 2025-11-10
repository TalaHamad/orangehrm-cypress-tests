Feature: OrangeHRM Login Functionality

  Background:
    Given user is on the OrangeHRM login page

  @positive @login
  Scenario: Successful login with valid credentials
    When user enters username "Admin"
    And user enters password "admin123"
    And user clicks the login button
    Then user should be redirected to the dashboard

  @negative @login @validation
  Scenario: Required field validation for empty username
    When user leaves username field empty
    And user enters password "admin123"
    And user clicks the login button
    Then user should see username required error message

  @negative @login @validation
  Scenario: Required field validation for empty password
    When user enters username "Admin"
    And user leaves password field empty
    And user clicks the login button
    Then user should see password required error message

  @negative @login @validation
  Scenario: Required field validation for both empty fields
    When user leaves both username and password fields empty
    And user clicks the login button
    Then user should see both fields required error message

  @negative @login @credentials
  Scenario Outline: Invalid credentials show authentication error
    When user enters username "<username>"
    And user enters password "<password>"
    And user clicks the login button
    Then user should see "Invalid credentials" error message

    Examples:
      | username        | password        |
      | invalidusername | invalidpassword |
      | Admin           | wrongpass       |
      | invalidusername | admin123        |

  @forgot-password @login
  Scenario: Access forgot password functionality
    When user clicks on the "Forgot your password?" link
    Then user should be redirected to the password reset page