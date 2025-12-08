import { getFullPimUrl, getFullRecruitmentUrl } from "@support/utils";
import { NewEmployee, ResponseEmployee } from "./types";

export default class EmployeeDataUtils {
  static createEmployee(employee: NewEmployee) {
    return cy
      .request("POST", getFullPimUrl("employees"), {
        ...employee,
      })
      .then((response) => response.body.data.empNumber);
  }

  static getEmployees(): Cypress.Chainable<ResponseEmployee[]> {
    return cy
      .request("GET", getFullPimUrl("employees"))
      .then((response) => response.body.data);
  }

  static getEmployeeById(
    employeeId: string
  ): Cypress.Chainable<ResponseEmployee> {
    return this.getEmployees().then((employees: ResponseEmployee[]) => {
      const foundEmployee = employees.find(
        (emp: ResponseEmployee) => emp.employeeId === employeeId
      );
      return foundEmployee;
    });
  }

  static deleteEmployee(employeeId: string) {
    this.getEmployeeById(employeeId).then((foundEmployee: ResponseEmployee) => {
      if (foundEmployee) {
        cy.request({
          method: "DELETE",
          url: getFullPimUrl("employees"),
          body: {
            ids: [foundEmployee.empNumber],
          },
        });
      }
    });
  }

  static getInterviewers(): Cypress.Chainable<ResponseEmployee[]> {
    return cy
      .request(
        "GET",
        getFullRecruitmentUrl("interviewers?nameOrId=CypressEmployee")
      )
      .then((response) => response.body.data);
  }
}
