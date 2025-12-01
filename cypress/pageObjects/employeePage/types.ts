export interface NewEmployee {
  firstName: string;
  middleName: string;
  lastName: string;
  empPicture: string;
  employeeId: string;
}

export interface ResponseEmployee {
  empNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  employeeId: string;
  terminationId: string;
}

export interface InterviewData {
  interviewDate: string;
  interviewName: string;
  interviewTime: string;
  note: string;
}
