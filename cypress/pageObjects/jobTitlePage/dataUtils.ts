import { getFullAdminUrl } from "@support/utils";
import { NewJobTitle, ResponseJobTitle } from "./types";

export default class JobTitleDataUtils {
  static createJobTitle(jobTitle: NewJobTitle) {
    return cy
      .request("POST", getFullAdminUrl("job-titles"), {
        ...jobTitle,
        specification: null,
      })
      .then((response) => {
        return response.body.data.id;
      });
  }

  static getJobTitles(): Cypress.Chainable<ResponseJobTitle[]> {
    return cy.request("GET", getFullAdminUrl("job-titles")).then((response) => {
      return response.body.data as ResponseJobTitle[];
    });
  }

  static filterOnJobTitle(jobId: number): Cypress.Chainable<ResponseJobTitle> {
    return this.getJobTitles().then((jobTitles: ResponseJobTitle[]) => {
      const foundJobTitle = jobTitles.find(
        (jobTitle: ResponseJobTitle) => jobTitle.id === jobId
      );

      if (!foundJobTitle) {
        throw new Error(`Job title with ID ${jobId} not found`);
      }

      return foundJobTitle;
    });
  }

  static deleteJobTitle(jobTitleId: number) {
    return this.filterOnJobTitle(jobTitleId).then(
      (foundJobTitle: ResponseJobTitle) => {
        return cy.request({
          method: "DELETE",
          url: getFullAdminUrl("job-titles"),
          body: {
            ids: [foundJobTitle.id],
          },
        });
      }
    );
  }
}
