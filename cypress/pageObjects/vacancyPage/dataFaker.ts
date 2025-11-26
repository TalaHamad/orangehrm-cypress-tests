import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewVacancy } from "./types";

export const getVacancy = (prefix: string = getPrefix()): NewVacancy => {
  return {
    name: `CypressVac-${prefix}-`,
    jobTitleId: 0,
    employeeId: 0,
    numOfPositions: Math.floor(Math.random() * 5) + 1, // Random number between 1-5
    description: "",
    status: true, // Active by default
    isPublished: true, // Published by default
  };
};
