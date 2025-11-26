import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import {
  getCandidate,
  getInterviewData,
} from "@pageObjects/candidatePage/dataFaker";
import CandidateDataUtils from "@pageObjects/candidatePage/dataUtils";
import { getEmployee } from "@pageObjects/employeePage/dataFaker";
import EmployeeDataUtils from "@pageObjects/employeePage/dataUtils";
import { getJobTitle } from "@pageObjects/jobTitlePage/dataFaker";
import JobTitleDataUtils from "@pageObjects/jobTitlePage/dataUtils";
import { getUser } from "@pageObjects/userPage/dataFaker";
import UserDataUtils from "@pageObjects/userPage/dataUtils";
import { getVacancy } from "@pageObjects/vacancyPage/dataFaker";
import VacancyDataUtils from "@pageObjects/vacancyPage/dataUtils";

const employee = getEmployee();
const jobTitle = getJobTitle();
const vacancy = getVacancy();
const candidate = getCandidate();
const user = getUser();
let currentCandidateId: number;
const interview = getInterviewData();

let firstInterviewId: number;
let secondInterviewId: number;

Given("The system has a hiring manager", () => {
  EmployeeDataUtils.createEmployee(employee).then((empNumber) => {
    UserDataUtils.createUser({ ...user, empNumber });
    vacancy.employeeId = empNumber;
  });
});

Given("The system has a job title", () => {
  JobTitleDataUtils.createJobTitle(jobTitle).then((id) => {
    vacancy.jobTitleId = id;
  });
});

Given("The system has a vacancy", () => {
  VacancyDataUtils.createVacancy(vacancy).then((id) => {
    candidate.vacancyId = id;
  });
});

Given("I have a candidate with application initiated status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
  });
});

When("I shortlist the candidate with note {string}", (note: string) => {
  CandidateDataUtils.updateCandidateStatus({
    candidateId: currentCandidateId,
    note: note,
    endpoint: "shortlist",
  });
});

When("I schedule the first interview for this candidate", () => {
  CandidateDataUtils.scheduleInterviewCandidate({
    candidateId: currentCandidateId,
    interviewDate: interview.interviewDate,
    interviewName: interview.interviewName,
    interviewTime: interview.interviewTime,
    note: interview.note,
  }).then((id) => {
    firstInterviewId = id;
  });
});

When(
  "I mark the first interview as passed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: currentCandidateId,
      interviewId: firstInterviewId,
      note: note,
      result: "pass",
    });
  }
);

When("I offer a job", () => {
  CandidateDataUtils.updateCandidateStatus({
    candidateId: currentCandidateId,
    note: null,
    endpoint: "job/offer",
  });
});

When("I hired the candidate", () => {
  CandidateDataUtils.updateCandidateStatus({
    candidateId: currentCandidateId,
    note: null,
    endpoint: "hire",
  });
});

When(
  "I mark the first interview as faild with note {string}",
  (note: string) => {
    // CandidateDataUtils.updateInterviewResult({
    //   candidateId: currentCandidateId,
    //   note: note,
    //   interviewId: firstInterviewId,
    //   result: "fail",
    // });
  }
);

When("I decline the job offer", () => {
  // CandidateDataUtils.updateCandidateStatus({
  //   candidateId: currentCandidateId,
  //   note: null,
  //   endpoint: "job/decline",
  // });
});

When("I reject the candidate", () => {
  // CandidateDataUtils.updateCandidateStatus({
  //   candidateId: currentCandidateId,
  //   note: null,
  //   endpoint: "reject",
  // });
});

When("I schedule interview from interview passed", () => {
  // CandidateDataUtils.scheduleInterviewCandidate({
  //   candidateId: currentCandidateId,
  //   ...interview,
  // }).then((id) => {
  //   secondInterviewId = id;
  // });
});
