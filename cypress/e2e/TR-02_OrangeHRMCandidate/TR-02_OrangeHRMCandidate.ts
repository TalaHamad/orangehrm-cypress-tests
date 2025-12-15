import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CandidatePageActions from "@pageObjects/candidatePage/actions";
import CandidatePageAssertions from "@pageObjects/candidatePage/assertions";
import { getCandidate } from "@pageObjects/candidatePage/dataFaker";
import CandidateDataUtils from "@pageObjects/candidatePage/dataUtils";
import { NewCandidate } from "@pageObjects/candidatePage/types";
import {
  getEmployee,
  getInterviewData,
} from "@pageObjects/employeePage/dataFaker";
import EmployeeDataUtils from "@pageObjects/employeePage/dataUtils";
import { InterviewData, NewEmployee } from "@pageObjects/employeePage/types";
import { getJobTitle } from "@pageObjects/jobTitlePage/dataFaker";
import JobTitleDataUtils from "@pageObjects/jobTitlePage/dataUtils";
import { NewJobTitle } from "@pageObjects/jobTitlePage/types";
import { getUser } from "@pageObjects/userPage/dataFaker";
import UserDataUtils from "@pageObjects/userPage/dataUtils";
import { NewUser } from "@pageObjects/userPage/types";
import { getVacancy } from "@pageObjects/vacancyPage/dataFaker";
import VacancyDataUtils from "@pageObjects/vacancyPage/dataUtils";
import { NewVacancy } from "@pageObjects/vacancyPage/types";

let employee: NewEmployee;
let user: NewUser;
let jobTitle: NewJobTitle;
let vacancy: NewVacancy;
let candidate: NewCandidate;
let interview: InterviewData;

let candidateId = 0;

beforeEach(() => {
  employee = getEmployee();
  user = getUser();
  jobTitle = getJobTitle();
  vacancy = getVacancy();
  candidate = getCandidate();
  interview = getInterviewData();

  candidateId = 0;
});

Given("The system has a hiring manager", () => {
  EmployeeDataUtils.createEmployee(employee).then((empNumber) => {
    UserDataUtils.createUser({ ...user, empNumber }).then(() => {
      vacancy.employeeId = empNumber;
    });
  });
});

Given("The system has a job title", () => {
  JobTitleDataUtils.createJobTitle(jobTitle).then((jobTitleid) => {
    vacancy.jobTitleId = jobTitleid;
  });
});

Given("The system has a vacancy", () => {
  VacancyDataUtils.createVacancy(vacancy).then((vacancyid) => {
    candidate.vacancyId = vacancyid;
  });
});

Given(
  "A candidate is displayed on the candidate details page with Application Initiated status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidatePageActions.visitCandidatePage(candidateid);
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Shortlisted status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() => {
        CandidatePageActions.visitCandidatePage(candidateid);
      });
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Scheduled status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview Scheduled status",
        }).then(() => {
          CandidatePageActions.visitCandidatePage(candidateid);
        })
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Failed status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        }).then((interviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: interviewId,
            note: "Setup for Interview Failed status",
            result: "fail",
          }).then(() => {
            CandidatePageActions.visitCandidatePage(candidateid);
          })
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Passed status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        }).then((interviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: interviewId,
            note: "Setup for Interview Passed status",
            result: "pass",
          }).then(() => {
            CandidatePageActions.visitCandidatePage(candidateid);
          })
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Scheduled status after first interview passed",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "First interview setup",
        }).then((firstInterviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          }).then(() =>
            CandidateDataUtils.scheduleInterviewCandidate({
              candidateId: candidateid,
              interviewDate: interview.interviewDate,
              interviewName: interview.interviewTitle,
              interviewTime: interview.interviewTime,
              note: "Second interview setup",
            }).then(() => {
              CandidatePageActions.visitCandidatePage(candidateid);
            })
          )
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Failed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "First interview setup",
        }).then((firstInterviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          }).then(() =>
            CandidateDataUtils.scheduleInterviewCandidate({
              candidateId: candidateid,
              interviewDate: interview.interviewDate,
              interviewName: interview.interviewTitle,
              interviewTime: interview.interviewTime,
              note: "Second interview setup",
            }).then((secondInterviewId) =>
              CandidateDataUtils.updateInterviewResult({
                candidateId: candidateid,
                interviewId: secondInterviewId,
                note: "Second interview failed",
                result: "fail",
              }).then(() => {
                CandidatePageActions.visitCandidatePage(candidateid);
              })
            )
          )
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Interview Passed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "First interview setup",
        }).then((firstInterviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          }).then(() =>
            CandidateDataUtils.scheduleInterviewCandidate({
              candidateId: candidateid,
              interviewDate: interview.interviewDate,
              interviewName: interview.interviewTitle,
              interviewTime: interview.interviewTime,
              note: "Second interview setup",
            }).then((secondInterviewId) =>
              CandidateDataUtils.updateInterviewResult({
                candidateId: candidateid,
                interviewId: secondInterviewId,
                note: "Second interview passed",
                result: "pass",
              }).then(() => {
                CandidatePageActions.visitCandidatePage(candidateid);
              })
            )
          )
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Job Offered status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        }).then((interviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: interviewId,
            note: "Setup for Interview Passed status",
            result: "pass",
          }).then(() =>
            CandidateDataUtils.offerJob({
              candidateId: candidateid,
              note: "Setup for Job Offered status",
            }).then(() => {
              CandidatePageActions.visitCandidatePage(candidateid);
            })
          )
        )
      );
    });
  }
);

Given(
  "A candidate is displayed on the candidate details page with Offer Declined status",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      }).then(() =>
        CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewTitle,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        }).then((interviewId) =>
          CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: interviewId,
            note: "Setup for Interview Passed status",
            result: "pass",
          }).then(() =>
            CandidateDataUtils.offerJob({
              candidateId: candidateid,
              note: "Setup for Job Offered status",
            }).then(() =>
              CandidateDataUtils.declineOffer({
                candidateId: candidateid,
                note: "Setup for Offer Declined status",
              }).then(() => {
                CandidatePageActions.visitCandidatePage(candidateid);
              })
            )
          )
        )
      );
    });
  }
);

When("The {string} button is clicked", (action: string) => {
  CandidatePageActions.clickAction(action);
});

When(
  "The {string} form is displayed with candidate information on the Candidate Change Status Page",
  (status: string) => {
    CandidatePageAssertions.verifyOnChangeStatusPage();
    CandidatePageAssertions.verifyFormIsOpen(status);

    CandidatePageAssertions.verifyCandidateName(
      `${candidate.firstName}  ${candidate.lastName}`
    )
      .verifyCandidateVacancy(vacancy.name)
      .verifyCandidateHiringManager(
        `${employee.firstName} ${employee.middleName} ${employee.lastName}`
      );

    CandidateDataUtils.getCandidateByFirstName(candidate.firstName).then(
      (candidate) => {
        CandidatePageAssertions.verifyCandidateCurrentStatus(candidate);
      }
    );
  }
);

When("The interview details is entered", () => {
  CandidatePageActions.fillInterviewTitle(interview.interviewTitle)
    .fillInterviewer(`${employee.firstName} ${employee.lastName}`)
    .fillInterviewDate(interview.interviewDate);
});

When("The note {string} is entered", (note: string) => {
  CandidatePageActions.fillNote(note);
});

When("The action is saved", () => {
  CandidatePageActions.clickAction("Save");
});

When("The action is canceled", () => {
  CandidatePageActions.clickAction("Cancel");
});

Then(
  "The system should be redirected to the candidate details page and the status of the candidate should be {string}",
  (expectedStatus: string) => {
    CandidatePageAssertions.verifyOnCandidateDetailsPage(candidateId);
    CandidatePageAssertions.verifyCandidateStatusAtCandidateDetailsPage(
      expectedStatus
    );
  }
);

Then(
  "The system should be redirected to the candidate details page and the status of the candidate should remain {string}",
  (expectedStatus: string) => {
    CandidatePageAssertions.verifyOnCandidateDetailsPage(candidateId);
    CandidatePageAssertions.verifyCandidateStatusAtCandidateDetailsPage(
      expectedStatus
    );
  }
);

afterEach(() => {
  cy.then(() => {
    CandidateDataUtils.deleteCandidate(candidate.firstName);
    VacancyDataUtils.deleteVacancy(vacancy.name);
    JobTitleDataUtils.deleteJobTitle(jobTitle.title);
    UserDataUtils.deleteUser(user.username);
    EmployeeDataUtils.deleteEmployee(employee.employeeId);
  }).then(() => {
    employee = null;
    user = null;
    jobTitle = null;
    vacancy = null;
    candidate = null;
    interview = null;
  });
});
