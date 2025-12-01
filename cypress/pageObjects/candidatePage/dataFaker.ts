import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewCandidate } from "./types";
import moment from "moment";

export const getCandidate = (prefix: string = getPrefix()): NewCandidate => {
  return {
    firstName: `CypressFirst-${prefix}-${generateRandomIntegerOfLength(2)}`,
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
