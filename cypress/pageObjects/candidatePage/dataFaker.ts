import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewCandidate, ScheduleInterviewData } from "./types";
import moment from "moment";

export const getCandidate = (prefix: string = getPrefix()): NewCandidate => {
  return {
    firstName: `CypressFirst-${prefix}`,
    middleName: "",
    lastName: `CypressLast-${generateRandomIntegerOfLength(4)}`,
    email: `Cypresscand${generateRandomIntegerOfLength(6)}@test.com`,
    contactNumber: "",
    keywords: "",
    comment: "",
    dateOfApplication: moment().format("YYYY-MM-DD"),
    consentToKeepData: true,
    vacancyId: 0,
  };
};

export const getInterviewData = (
  prefix: string = getPrefix()
): ScheduleInterviewData => {
  // Generate a future date (next 7-30 days)
  const futureDate = moment()
    .add(Math.floor(Math.random() * 23) + 7, "days")
    .format("YYYY-MM-DD");

  // Generate random time between 9 AM and 5 PM
  const hours = Math.floor(Math.random() * 8) + 9; // 9-16 (9 AM to 4 PM)
  const minutes = Math.random() > 0.5 ? "30" : "00";
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;

  const interviewTypes = [
    "Technical Interview",
    "HR Interview",
    "Cultural Fit Interview",
    "Manager Interview",
    "Final Round Interview",
    "Screening Interview",
  ];

  const randomType =
    interviewTypes[Math.floor(Math.random() * interviewTypes.length)];

  return {
    interviewDate: futureDate,
    interviewName: `CypressInterview-${randomType}-${prefix}-${generateRandomIntegerOfLength(
      5
    )}`,
    interviewTime: formattedTime,
    note: `Cypress Test Interview Note.`,
  };
};
