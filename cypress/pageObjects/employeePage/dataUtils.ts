import { ResponseEmployee, NewEmployee } from "./types";

export default class EmployeeDataUtils {
  static createEmployee(employee: NewEmployee) {
    return cy.request("POST", "/web/index.php/api/v2/pim/employees", {
      ...employee,
    });
  }

  static getEmployees(): Cypress.Chainable<ResponseEmployee[]> {
    return cy
      .request("GET", "/web/index.php/api/v2/pim/employees?limit=50")
      .then((response) => {
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
          url: "/web/index.php/api/v2/pim/employees",
          body: {
            ids: [foundEmployee.empNumber],
          },
        });
      }
    );
  }
}
