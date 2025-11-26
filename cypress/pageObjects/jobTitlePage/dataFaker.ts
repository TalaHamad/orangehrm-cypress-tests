import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewJobTitle } from "./types";

export const getJobTitle = (prefix: string = getPrefix()): NewJobTitle => {
  const jobTitles = [
    "Cypress Software Engineer",
    "Cypress QA Engineer",
    "Cypress DevOps Specialist",
    "Cypress Product Manager",
    "Cypress UX Designer",
    "Cypress Data Analyst",
    "Cypress System Administrator",
    "Cypress Network Engineer",
    "Cypress Security Analyst",
    "Cypress Technical Lead",
  ];

  const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];

  return {
    title: `${randomTitle} - ${prefix} - ${generateRandomIntegerOfLength(5)}`,
    description: "Cypress job description",
    note: "Cypress job note",
  };
};
