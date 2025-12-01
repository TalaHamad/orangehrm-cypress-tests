import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
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

let currentCandidateId = 0;
let firstInterviewId = 0;
let secondInterviewId = 0;

let vacancyId = 0;
let jobTitleId = 0;
let userId = 0;

Before(() => {
  employee = getEmployee();
  user = getUser();
  jobTitle = getJobTitle();
  vacancy = getVacancy();
  candidate = getCandidate();
  interview = getInterviewData();

  currentCandidateId = 0;
  firstInterviewId = 0;
  secondInterviewId = 0;

  vacancyId = 0;
  jobTitleId = 0;
  userId = 0;
});

After(() => {
  if (currentCandidateId) {
    CandidateDataUtils.deleteCandidate(currentCandidateId);
  }
  if (vacancyId) {
    VacancyDataUtils.deleteVacancy(vacancyId);
  }
  if (jobTitleId) {
    JobTitleDataUtils.deleteJobTitle(jobTitleId);
  }
  if (userId) {
    UserDataUtils.deleteUser(userId);
  }
  if (employee.employeeId) {
    EmployeeDataUtils.deleteEmployee(employee.employeeId);
  }
});

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
    vacancy.jobTitleId = jobTitleid;
    jobTitleId = jobTitleid;
  });
});

Given("the system has a vacancy", () => {
  VacancyDataUtils.createVacancy(vacancy).then((vacancyid) => {
    candidate.vacancyId = vacancyid;
    vacancyId = vacancyid;
  });
});

Given("a candidate exists with Application Initiated status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
  });
});

Given("a candidate exists with Shortlisted status", () => {
  return CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
    return CandidateDataUtils.shortlistCandidate({
      candidateId: candidateid,
      note: "Setup Shortlisted",
    });
  });
});

Given("a candidate exists with Interview Scheduled status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
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

Given("a candidate exists with Interview Failed status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
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

Given("a candidate exists with Interview Passed status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
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
  "a candidate exists with Interview Scheduled status after first interview passed",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      currentCandidateId = candidateid;
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
  "a candidate exists with Interview Failed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      currentCandidateId = candidateid;
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
  "a candidate exists with Interview Passed status after second interview",
  () => {
    CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
      currentCandidateId = candidateid;
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

Given("a candidate exists with Job Offered status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
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

Given("a candidate exists with Offer Declined status", () => {
  CandidateDataUtils.createCandidate(candidate).then((candidateid) => {
    currentCandidateId = candidateid;
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

When("the candidate is rejected with note {string}", (note: string) => {
  CandidateDataUtils.rejectCandidate({
    candidateId: currentCandidateId,
    note: note,
  });
});

When("the candidate is shortlisted with note {string}", (note: string) => {
  CandidateDataUtils.shortlistCandidate({
    candidateId: currentCandidateId,
    note: note,
  });
});

When(
  "the first interview is scheduled for the candidate with note {string}",
  (note: string) => {
    return CandidateDataUtils.scheduleInterviewCandidate({
      candidateId: currentCandidateId,
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
  "the first interview is marked as passed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: currentCandidateId,
      interviewId: firstInterviewId,
      note: note,
      result: "pass",
    });
  }
);

When(
  "the first interview is marked as failed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: currentCandidateId,
      interviewId: firstInterviewId,
      note: note,
      result: "fail",
    });
  }
);

When(
  "the second interview is scheduled for the candidate with note {string}",
  (note: string) => {
    return CandidateDataUtils.scheduleInterviewCandidate({
      candidateId: currentCandidateId,
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
  "the second interview is marked as passed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: currentCandidateId,
      interviewId: secondInterviewId,
      note: note,
      result: "pass",
    });
  }
);

When(
  "the second interview is marked as failed with note {string}",
  (note: string) => {
    CandidateDataUtils.updateInterviewResult({
      candidateId: currentCandidateId,
      interviewId: secondInterviewId,
      note: note,
      result: "fail",
    });
  }
);

When("a job is offered to the candidate with note {string}", (note: string) => {
  CandidateDataUtils.offerJob({
    candidateId: currentCandidateId,
    note: note,
  });
});

When("the offer is marked as declined with note {string}", (note: string) => {
  CandidateDataUtils.declineOffer({
    candidateId: currentCandidateId,
    note: note,
  });
});

When("the candidate is hired with note {string}", (note: string) => {
  CandidateDataUtils.hireCandidate({
    candidateId: currentCandidateId,
    note: note,
  });
});

Then("the candidate status should be {string}", (expectedStatus: string) => {
  cy.wait(1000);
  CandidateDataUtils.filterOnCandidateID(currentCandidateId).then(
    (candidate) => {
      expect(candidate.status.label).to.equal(expectedStatus);
    }
  );
});
