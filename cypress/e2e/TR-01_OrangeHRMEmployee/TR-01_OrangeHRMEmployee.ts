import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getCandidate } from "@pageObjects/candidatePage/dataFaker";
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
const user = getUser();
const jobTitle = getJobTitle();
const vacancy = getVacancy();
const candidate = getCandidate();
let candidateId = 0;
let vacancyId = 0;
let jobTitleId = 0;
let userId = 0;

Given("the system has a hiring manager", () => {
  EmployeeDataUtils.createEmployee(employee).then((empNumber) => {
    return UserDataUtils.createUser({ ...user, empNumber }).then((userid) => {
      vacancy.employeeId = empNumber;
      userId = userid;
    });
  });
});

Given("the system has a job title", () => {
  JobTitleDataUtils.createJobTitle(jobTitle).then((jobTitleid) => {
    jobTitleId = jobTitleid;
    vacancy.jobTitleId = jobTitleid;
  });
});

Given("the system has a vacancy", () => {
  VacancyDataUtils.createVacancy(vacancy).then((vacancyid) => {
    vacancyId = vacancyid;
    candidate.vacancyId = vacancyid;
  });
});

Given("the system has a candidate", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
  });
});

When("that candidate is deleted", () => {
  CandidateDataUtils.deleteCandidate(candidateId);
});

When("that vacancy is deleted", () => {
  VacancyDataUtils.deleteVacancy(vacancyId);
});

When("that job title is deleted", () => {
  JobTitleDataUtils.deleteJobTitle(jobTitleId);
});

When("that hiring manager is deleted", () => {
  UserDataUtils.deleteUser(userId);
  EmployeeDataUtils.deleteEmployee(employee.employeeId);
});
