import { getFullUrl } from "@support/utils";
import { NewCandidate, ResponseCandidate } from "./types";
import { mapInterviewToRequest } from "@pageObjects/employeePage/mappers";
import EmployeeDataUtils from "@pageObjects/employeePage/dataUtils";

export default class CandidateDataUtils {
  static createCandidate(candidate: NewCandidate) {
    return cy
      .request(
        "POST",
        getFullUrl({
          page: "recruitment",
          endpoint: "candidates",
        }),
        candidate
      )
      .then((response) => response.body.data.id);
  }

  static shortlistCandidate({
    candidateId,
    note,
  }: {
    candidateId: number;
    note: string;
  }) {
    return this.updateCandidateStatus(candidateId, note, "shortlist");
  }

  static scheduleInterviewCandidate({
    candidateId,
    interviewDate,
    interviewName,
    interviewTime,
    note,
  }: {
    candidateId: number;
    interviewDate: string;
    interviewName: string;
    interviewTime: string;
    note: string;
  }) {
    return EmployeeDataUtils.getInterviewers().then((interviewers) => {
      return cy
        .request({
          method: "POST",
          url: getFullUrl({
            page: "recruitment",
            endpoint: `candidates/${candidateId}/shedule-interview`,
          }),

          body: mapInterviewToRequest(
            interviewDate,
            interviewName,
            interviewTime,
            note,
            interviewers
          ),
        })
        .then((response) => {
          return response.body.data.id; //interviewid
        });
    });
  }

  static updateInterviewResult({
    candidateId,
    interviewId,
    note,
    result,
  }: {
    candidateId: number;
    interviewId: number;
    note: string;
    result: "pass" | "fail";
  }) {
    return cy.request({
      method: "PUT",
      url: getFullUrl({
        page: "recruitment",
        endpoint: `candidates/${candidateId}/interviews/${interviewId}/${result}`,
      }),
      body: { note },
    });
  }

  static offerJob({
    candidateId,
    note,
  }: {
    candidateId: number;
    note: string;
  }) {
    return this.updateCandidateStatus(candidateId, note, "job/offer");
  }

  static declineOffer({
    candidateId,
    note,
  }: {
    candidateId: number;
    note: string;
  }) {
    return this.updateCandidateStatus(candidateId, note, "job/decline");
  }

  static hireCandidate({
    candidateId,
    note,
  }: {
    candidateId: number;
    note: string;
  }) {
    return this.updateCandidateStatus(candidateId, note, "hire");
  }

  static rejectCandidate({
    candidateId,
    note,
  }: {
    candidateId: number;
    note: string;
  }) {
    return this.updateCandidateStatus(candidateId, note, "reject");
  }

  private static updateCandidateStatus(
    candidateId: number,
    note: string,
    endpoint: string
  ) {
    return cy.request({
      method: "PUT",
      url: getFullUrl({
        page: "recruitment",
        endpoint: `candidates/${candidateId}/${endpoint}`,
      }),
      body: { note },
    });
  }

  static getCandidates(): Cypress.Chainable<ResponseCandidate[]> {
    return cy
      .request(
        "GET",
        getFullUrl({
          page: "recruitment",
          endpoint: "candidates?model=list",
        })
      )
      .then((response) => response.body.data);
  }

  static getCandidateByFirstName(
    candidateFirstName: string
  ): Cypress.Chainable<ResponseCandidate> {
    return this.getCandidates().then((candidates: ResponseCandidate[]) => {
      const foundCandidate = candidates.find(
        (cand: ResponseCandidate) => cand.firstName === candidateFirstName
      );
      return foundCandidate;
    });
  }

  static deleteCandidate(candidateFirstName: string) {
    this.getCandidateByFirstName(candidateFirstName).then(
      (foundCandidate: ResponseCandidate) => {
        if (foundCandidate) {
          cy.request({
            method: "DELETE",
            url: getFullUrl({
              page: "recruitment",
              endpoint: "candidates",
            }),
            body: {
              ids: [foundCandidate.id],
            },
          });
        }
      }
    );
  }
}
