import { getFullRecruitmentUrl } from "@support/utils";
import { NewCandidate } from "./types";

export default class CandidateDataUtils {
  static createCandidate(candidate: NewCandidate) {
    return cy
      .request("POST", getFullRecruitmentUrl("candidates"), candidate)
      .then((response) => {
        return response.body.data.id;
      });
  }

  static getHiringManagers(): Cypress.Chainable<number[]> {
    return cy
      .request("GET", getFullRecruitmentUrl("interviewers?nameOrId=Cypress"))
      .then((response) => {
        return response.body.data.map((item: any) => item.empNumber);
      });
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
    return this.getHiringManagers().then((empNumbers) => {
      const count =
        Math.floor(Math.random() * Math.min(empNumbers.length, 5)) + 1;
      const shuffled = empNumbers.sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);

      const interviewData = {
        interviewDate: interviewDate,
        interviewName: interviewName,
        interviewTime: interviewTime,
        note: note,
        interviewerEmpNumbers: selected,
      };

      return cy
        .request({
          method: "POST",
          url: getFullRecruitmentUrl(
            `candidates/${candidateId}/shedule-interview`
          ),
          body: interviewData,
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
      url: getFullRecruitmentUrl(
        `candidates/${candidateId}/interviews/${interviewId}/${result}`
      ),
      body: { note },
    });
  }

  static updateCandidateStatus({
    candidateId,
    note,
    endpoint,
  }: {
    candidateId: number;
    note: string;
    endpoint: "shortlist" | "job/offer" | "job/decline" | "hire" | "reject";
  }) {
    return cy.request({
      method: "PUT",
      url: getFullRecruitmentUrl(`candidates/${candidateId}/${endpoint}`),
      body: { note },
    });
  }
}
