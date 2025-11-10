import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getEmployee } from "@pageObjects/employeePage/dataFaker";
import EmployeeDataUtils from "@pageObjects/employeePage/dataUtils";

const employee = getEmployee();

before(() => {
  cy.login("Admin", "admin123");
});

Given("The system has an employee", () => {
  EmployeeDataUtils.createEmployee(employee);
});

When("the user deletes that employee", () => {
  EmployeeDataUtils.deleteEmployee(employee.employeeId);
});
