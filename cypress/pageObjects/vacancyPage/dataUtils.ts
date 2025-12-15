import { getFullUrl } from "@support/utils";
import { NewVacancy, ResponseVacancy } from "./types";

export default class VacancyDataUtils {
  static createVacancy(vacancy: NewVacancy) {
    return cy
      .request(
        "POST",
        getFullUrl({
          page: "recruitment",
          endpoint: "vacancies",
        }),
        vacancy
      )
      .then((response) => response.body.data.id);
  }

  static getVacancies(): Cypress.Chainable<ResponseVacancy[]> {
    return cy
      .request(
        "GET",
        getFullUrl({
          page: "recruitment",
          endpoint: "vacancies",
        })
      )
      .then((response) => response.body.data);
  }

  static getVacancyByName(
    vacancyName: string
  ): Cypress.Chainable<ResponseVacancy> {
    return this.getVacancies().then((vacancies: ResponseVacancy[]) => {
      const foundVacancy = vacancies.find(
        (vacancy: ResponseVacancy) => vacancy.name === vacancyName
      );
      return foundVacancy;
    });
  }

  static deleteVacancy(vacancyName: string) {
    this.getVacancyByName(vacancyName).then((foundVacancy: ResponseVacancy) => {
      if (foundVacancy) {
        cy.request({
          method: "DELETE",
          url: getFullUrl({
            page: "recruitment",
            endpoint: "vacancies",
          }),
          body: {
            ids: [foundVacancy.id],
          },
        });
      }
    });
  }
}
