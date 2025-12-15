import { getFullUrl } from "@support/utils";
import { NewJobTitle, ResponseJobTitle } from "./types";

export default class JobTitleDataUtils {
  static createJobTitle(jobTitle: NewJobTitle) {
    return cy
      .request(
        "POST",
        getFullUrl({
          page: "admin",
          endpoint: "job-titles",
        }),
        {
          ...jobTitle,
          specification: null,
        }
      )
      .then((response) => response.body.data.id);
  }

  static getJobTitles(): Cypress.Chainable<ResponseJobTitle[]> {
    return cy
      .request(
        "GET",
        getFullUrl({
          page: "admin",
          endpoint: "job-titles",
        })
      )
      .then((response) => response.body.data);
  }

  static getJobTitleByTitle(
    title: string
  ): Cypress.Chainable<ResponseJobTitle> {
    return this.getJobTitles().then((jobTitles: ResponseJobTitle[]) => {
      const foundJobTitle = jobTitles.find(
        (jobTitle: ResponseJobTitle) => jobTitle.title === title
      );
      return foundJobTitle;
    });
  }

  static deleteJobTitle(title: string) {
    this.getJobTitleByTitle(title).then((foundJobTitle: ResponseJobTitle) => {
      if (foundJobTitle) {
        cy.request({
          method: "DELETE",
          url: getFullUrl({
            page: "admin",
            endpoint: "job-titles",
          }),
          body: {
            ids: [foundJobTitle.id],
          },
        });
      }
    });
  }
}
