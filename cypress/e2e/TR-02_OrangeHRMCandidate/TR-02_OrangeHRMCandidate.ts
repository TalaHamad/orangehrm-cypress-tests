import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
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
let firstInterviewId = 0;
let secondInterviewId = 0;

beforeEach(() => {
  employee = getEmployee();
  user = getUser();
  jobTitle = getJobTitle();
  vacancy = getVacancy();
  candidate = getCandidate();
  interview = getInterviewData();

  candidateId = 0;
  firstInterviewId = 0;
  secondInterviewId = 0;
});

Given("The system has a hiring manager", () => {
  EmployeeDataUtils.createEmployee(employee).then((empNumber) => {
    return UserDataUtils.createUser({ ...user, empNumber }).then(() => {
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

Given("A candidate exists with Application Initiated status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
  });
});

Given("A candidate exists with Shortlisted status", () => {
  return CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    });
  });
});

Given("A candidate exists with Interview Scheduled status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    }).then(() => {
      return CandidateDataUtils.scheduleInterviewCandidate({
        candidateId: candidateid,
        interviewDate: interview.interviewDate,
        interviewName: interview.interviewName,
        interviewTime: interview.interviewTime,
        note: "Setup for Interview Scheduled status",
      }).then((interviewId) => {
        firstInterviewId = interviewId;
      });
    });
  });
});

Given("A candidate exists with Interview Failed status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    })
      .then(() => {
        return CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewName,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        });
      })
      .then((interviewId) => {
        return CandidateDataUtils.updateInterviewResult({
          candidateId: candidateid,
          interviewId: interviewId,
          note: "Setup for Interview Failed status",
          result: "fail",
        });
      });
  });
});

Given("A candidate exists with Interview Passed status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    })
      .then(() => {
        return CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewName,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        });
      })
      .then((interviewId) => {
        return CandidateDataUtils.updateInterviewResult({
          candidateId: candidateid,
          interviewId: interviewId,
          note: "Setup for Interview Passed status",
          result: "pass",
        });
      });
  });
});

Given(
  "A candidate exists with Interview Scheduled status after first interview passed",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      return CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "First interview setup",
          });
        })
        .then((firstInterviewId) => {
          return CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          });
        })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "Second interview setup",
          }).then((secondInterviewid) => {
            secondInterviewId = secondInterviewid;
          });
        });
    });
  }
);

Given(
  "A candidate exists with Interview Failed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      return CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "First interview setup",
          });
        })
        .then((firstInterviewId) => {
          return CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          });
        })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "Second interview setup",
          });
        })
        .then((secondInterviewId) => {
          return CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: secondInterviewId,
            note: "Second interview failed",
            result: "fail",
          });
        });
    });
  }
);

Given(
  "A candidate exists with Interview Passed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      candidateId = candidateid;
      return CandidateDataUtils.shortlistCandidate({
        candidateId: candidateid,
        note: "Setup Shortlisted",
      })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "First interview setup",
          });
        })
        .then((firstInterviewId) => {
          return CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: firstInterviewId,
            note: "First interview passed",
            result: "pass",
          });
        })
        .then(() => {
          return CandidateDataUtils.scheduleInterviewCandidate({
            candidateId: candidateid,
            interviewDate: interview.interviewDate,
            interviewName: interview.interviewName,
            interviewTime: interview.interviewTime,
            note: "Second interview setup",
          });
        })
        .then((secondInterviewId) => {
          return CandidateDataUtils.updateInterviewResult({
            candidateId: candidateid,
            interviewId: secondInterviewId,
            note: "Second interview passed",
            result: "pass",
          });
        });
    });
  }
);

Given("A candidate exists with Job Offered status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    })
      .then(() => {
        return CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewName,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        });
      })
      .then((interviewId) => {
        return CandidateDataUtils.updateInterviewResult({
          candidateId: candidateid,
          interviewId: interviewId,
          note: "Setup for Interview Passed status",
          result: "pass",
        });
      })
      .then(() => {
        return CandidateDataUtils.offerJob({
          candidateId: candidateid,
          note: "Setup for Job Offered status",
        });
      });
  });
});

Given("A candidate exists with Offer Declined status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    candidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    })
      .then(() => {
        return CandidateDataUtils.scheduleInterviewCandidate({
          candidateId: candidateid,
          interviewDate: interview.interviewDate,
          interviewName: interview.interviewName,
          interviewTime: interview.interviewTime,
          note: "Setup for Interview",
        });
      })
      .then((interviewId) => {
        return CandidateDataUtils.updateInterviewResult({
          candidateId: candidateid,
          interviewId: interviewId,
          note: "Setup for Interview Passed status",
          result: "pass",
        });
      })
      .then(() => {
        return CandidateDataUtils.offerJob({
          candidateId: candidateid,
          note: "Setup for Job Offered status",
        });
      })
      .then(() => {
        return CandidateDataUtils.declineOffer({
          candidateId: candidateid,
          note: "Setup for Offer Declined status",
        });
      });
  });
});

When("The candidate is rejected with note {string}", (note: string) => {
  CandidateDataUtils.rejectCandidate({
    candidateId: candidateId,
    note: note,
  });
});

When("The candidate is shortlisted with note {string}", (note: string) => {
  CandidateDataUtils.shortlistCandidate({
    candidateId: candidateId,
    note: note,
  });
});

When(
  "The first interview is scheduled for the candidate with note {string}",
  (note: string) => {
    return CandidateDataUtils.scheduleInterviewCandidate({
      candidateId: candidateId,
      interviewDate: interview.interviewDate,
      interviewName: interview.interviewName,
      interviewTime: interview.interviewTime,
      note: note,
    }).then((interviewId) => {
      firstInterviewId = interviewId;
    });
  }
);

When(
  "The first interview is marked as passed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: candidateId,
      interviewId: firstInterviewId,
      note: note,
      result: "pass",
    });
  }
);

When(
  "The first interview is marked as failed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: candidateId,
      interviewId: firstInterviewId,
      note: note,
      result: "fail",
    });
  }
);

When(
  "The second interview is scheduled for the candidate with note {string}",
  (note: string) => {
    return CandidateDataUtils.scheduleInterviewCandidate({
      candidateId: candidateId,
      interviewDate: interview.interviewDate,
      interviewName: interview.interviewName,
      interviewTime: interview.interviewTime,
      note: note,
    }).then((interviewId) => {
      secondInterviewId = interviewId;
    });
  }
);

When(
  "The second interview is marked as passed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: candidateId,
      interviewId: secondInterviewId,
      note: note,
      result: "pass",
    });
  }
);

When(
  "The second interview is marked as failed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: candidateId,
      interviewId: secondInterviewId,
      note: note,
      result: "fail",
    });
  }
);

When("A job is offered to the candidate with note {string}", (note: string) => {
  CandidateDataUtils.offerJob({
    candidateId: candidateId,
    note: note,
  });
});

When("The offer is marked as declined with note {string}", (note: string) => {
  CandidateDataUtils.declineOffer({
    candidateId: candidateId,
    note: note,
  });
});

When("The candidate is hired with note {string}", (note: string) => {
  CandidateDataUtils.hireCandidate({
    candidateId: candidateId,
    note: note,
  });
});

Then("The candidate status should be {string}", (expectedStatus: string) => {
  cy.wait(1000);
  CandidateDataUtils.getCandidateByFirstName(candidate.firstName).then(
    (candidate) => {
      expect(candidate.status.label).to.equal(expectedStatus);
    }
  );
});

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
