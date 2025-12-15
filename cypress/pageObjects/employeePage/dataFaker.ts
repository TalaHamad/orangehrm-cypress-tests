import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewEmployee, InterviewData } from "./types";
import moment from "moment";

export const getEmployee = (prefix: string = getPrefix()): NewEmployee => {
  return {
    firstName: `CypressEmployee-${prefix}`,
    middleName: "",
    lastName: `${generateRandomIntegerOfLength(5)}`,
    empPicture: null,
    employeeId: `${generateRandomIntegerOfLength(5)}`,
  };
};

export const getInterviewData = (
  prefix: string = getPrefix()
): InterviewData => {
  const futureDate = moment()
    .add(Math.floor(Math.random() * 23) + 7, "days")
    .format("YYYY-MM-DD");

  const hours = Math.floor(Math.random() * 8) + 9;
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
    interviewTitle: `CypressInterview-${randomType}-${prefix}-${generateRandomIntegerOfLength(
      5
    )}`,
    interviewTime: formattedTime,
    note: `Cypress Test Interview Note.`,
  };
};
