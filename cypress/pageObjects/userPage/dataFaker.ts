import { generateRandomIntegerOfLength, getPrefix } from "@support/utils";
import { NewUser } from "./types";

export const getUser = (prefix: string = getPrefix()): NewUser => {
  return {
    empNumber: 0,
    username: `hm_${prefix}_${generateRandomIntegerOfLength(3)}`,
    password: "strongPassword@123456",
    status: true,
    userRole: "ESS",
  };
};
