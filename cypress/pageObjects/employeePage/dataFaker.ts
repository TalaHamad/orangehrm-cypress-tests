import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewEmployee } from "./types";

export const getEmployee = (prefix: string = getPrefix()): NewEmployee => {
  return {
    firstName: `CypressEmployee-${prefix}`,
    middleName: "",
    lastName: `${generateRandomIntegerOfLength(5)}`,
    empPicture: null,
    employeeId: `${generateRandomIntegerOfLength(5)}`,
  };
};
