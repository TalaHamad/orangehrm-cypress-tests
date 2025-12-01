import { getFullRecruitmentUrl } from "@support/utils";
import { NewVacancy, ResponseVacancy } from "./types";

export default class VacancyDataUtils {
  static createVacancy(vacancy: NewVacancy) {
    return cy
      .request("POST", getFullRecruitmentUrl("vacancies"), vacancy)
      .then((response) => {
        return response.body.data.id;
      });
  }

  static getVacancies(): Cypress.Chainable<ResponseVacancy[]> {
    return cy
      .request("GET", getFullRecruitmentUrl("vacancies"))
      .then((response) => {
        return response.body.data as ResponseVacancy[];
      });
  }

  static filterOnVacancyID(
    vacancyId: number
  ): Cypress.Chainable<ResponseVacancy> {
    return this.getVacancies().then((vacancies: ResponseVacancy[]) => {
      const foundVacancy = vacancies.find(
        (vacancy: ResponseVacancy) => vacancy.id === vacancyId
      );

      if (!foundVacancy) {
        throw new Error(`Vacancy with ID ${vacancyId} not found`);
      }

      return foundVacancy;
    });
  }

  static deleteVacancy(vacancyId: number) {
    return this.filterOnVacancyID(vacancyId).then(
      (foundVacancy: ResponseVacancy) => {
        return cy.request({
          method: "DELETE",
          url: getFullRecruitmentUrl("vacancies"),
          body: {
            ids: [foundVacancy.id],
          },
        });
      }
    );
  }
}
