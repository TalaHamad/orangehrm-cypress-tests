import { ResponseEmployee } from "./types";

export const mapInterviewToRequest = (
  interviewDate: string,
  interviewName: string,
  interviewTime: string,
  note: string,
  interviewers: ResponseEmployee[]
) => {
  const interviewerEmpNumbers = interviewers.map((i) => i.empNumber);

  return {
    interviewDate,
    interviewName,
    interviewTime,
    note,
    interviewerEmpNumbers,
  };
};
