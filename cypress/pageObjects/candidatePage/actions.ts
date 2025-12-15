import { getFullUrl } from "@support/utils";

export default class CandidatePageActions {
  static visitCandidatePage(candidateId: number) {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
    return this;
  }

  static clickAction(action: string) {
    cy.intercept(
      "GET",
      getFullUrl({ page: "recruitment", endpoint: "candidates/*" })
    ).as("getCandidate");

    cy.intercept(
      "GET",
      getFullUrl({
        page: "recruitment",
        endpoint: "candidates/*/actions/allowed",
      })
    ).as("getAllowedActions");

    cy.intercept(
      "GET",
      getFullUrl({ page: "recruitment", endpoint: "candidates/*/history?**" })
    ).as("getCandidateHistory");

    cy.intercept(
      "GET",
      getFullUrl({ page: "leave", endpoint: "holidays?**" })
    ).as("getHolidays");

    cy.intercept(
      "GET",
      getFullUrl({ page: "leave", endpoint: "workweek?**" })
    ).as("getWorkweek");

    cy.intercept(
      "GET",
      getFullUrl({ page: "recruitment", endpoint: "vacancies?**" })
    ).as("getVacanciesSummary");

    cy.get("button").contains(action).click();

    cy.wait("@getCandidate");
    //cy.wait("@getAllowedActions");
    cy.wait("@getCandidateHistory");
    cy.wait("@getHolidays");
    cy.wait("@getWorkweek");
    //cy.wait("@getVacanciesSummary");

    return this;
  }

  static fillInterviewTitle(title: string) {
    cy.getInputByLabel("Interview Title").clear().type(title);
    return this;
  }

  static fillInterviewer(interviewer: string) {
    cy.intercept(
      "GET",
      getFullUrl({
        page: "recruitment",
        endpoint: "interviewers?**",
      })
    ).as("getInterviewers");

    cy.getInputByLabel("Interviewer").clear().type(interviewer);

    cy.wait("@getInterviewers").its("response.statusCode").should("eq", 200);

    cy.get('[role="listbox"]').contains('[role="option"]', interviewer).click();

    return this;
  }

  static fillInterviewDate(date: string) {
    cy.getInputByLabel("Date").clear().type(date);
    return this;
  }

  static fillNote(note: string) {
    cy.getTextareaByLabel("Notes").clear().type(note);
    return this;
  }
}
