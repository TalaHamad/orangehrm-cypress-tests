import { ResponseCandidate } from "./types";

export default class CandidatePageAssertions {
  static verifyOnChangeStatusPage() {
    cy.url().should("include", "recruitment/changeCandidateVacancyStatus");
    return this;
  }

  static verifyOnCandidateDetailsPage(candidateId: number) {
    cy.url().should("include", `/recruitment/addCandidate/${candidateId}`);
    return this;
  }

  // .find(".input") // class
  // .find("#input") // id
  // .find("input") // element tag

  static verifyFormIsOpen(title: string) {
    cy.contains(".orangehrm-main-title", title);
    return this;
  }

  static checkInputExists(label: string, assertion: "exist" | "not.exist") {
    cy.getInputByLabel(label).should(assertion);
    return this;
  }

  static checkInputContainsValue(
    label: string,
    value: string,
    assertion: "have.value" | "not.have.value" = "have.value"
  ) {
    cy.getInputByLabel(label).should(assertion, value);
    return this;
  }

  static verifyCandidateName(candidateName: string) {
    this.checkInputContainsValue("Candidate", candidateName);
    return this;
  }

  static verifyCandidateVacancy(vacancyName: string) {
    this.checkInputContainsValue("Vacancy", vacancyName);
    return this;
  }

  static verifyCandidateHiringManager(hiringManagerName: string) {
    this.checkInputContainsValue("Hiring Manager", hiringManagerName);
    return this;
  }

  static verifyCandidateCurrentStatus(candidate: ResponseCandidate) {
    this.checkInputContainsValue("Current Status", candidate.status.label);
    return this;
  }

  static verifyCandidateStatusAtCandidateDetailsPage(expectedStatus: string) {
    cy.contains(".orangehrm-recruitment-status", `Status: ${expectedStatus}`);
    return this;
  }
}
