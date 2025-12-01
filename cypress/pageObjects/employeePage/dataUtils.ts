import { getFullPimUrl, getFullRecruitmentUrl } from "@support/utils";
import { NewEmployee, ResponseEmployee } from "./types";

export default class EmployeeDataUtils {
  static createEmployee(employee: NewEmployee) {
    return cy
      .request("POST", getFullPimUrl("employees"), {
        ...employee,
      })
      .then((response) => {
        return response.body.data.empNumber;
      });
  }

  static getEmployees(): Cypress.Chainable<ResponseEmployee[]> {
    return cy.request("GET", getFullPimUrl("employees")).then((response) => {
      return response.body.data as ResponseEmployee[];
    });
  }

  static filterOnEmployeeID(
    employeeId: string
  ): Cypress.Chainable<ResponseEmployee> {
    return this.getEmployees().then((employees: ResponseEmployee[]) => {
      const foundEmployee = employees.find(
        (emp: ResponseEmployee) => emp.employeeId === employeeId
      );

      if (!foundEmployee) {
        throw new Error(`Employee with ID ${employeeId} not found`);
      }

      return foundEmployee;
    });
  }

  static deleteEmployee(employeeId: string) {
    return this.filterOnEmployeeID(employeeId).then(
      (foundEmployee: ResponseEmployee) => {
        return cy.request({
          method: "DELETE",
          url: getFullPimUrl("employees"),
          body: {
            ids: [foundEmployee.empNumber],
          },
        });
      }
    );
  }

  static getInterviewers(): Cypress.Chainable<ResponseEmployee[]> {
    return cy
      .request(
        "GET",
        getFullRecruitmentUrl("interviewers?nameOrId=CypressEmployee")
      )
      .then((response) => {
        return response.body.data as ResponseEmployee[];
      });
  }
}
