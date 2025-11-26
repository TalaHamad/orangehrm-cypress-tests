export interface NewVacancy {
  name: string;
  jobTitleId: number;
  employeeId: number;
  numOfPositions: number;
  description: string;
  status: boolean;
  isPublished: boolean;
}

export interface JobTitle {
  id: number;
  title: string;
  isDeleted: boolean;
}

export interface HiringManager {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  terminationId: number;
}

export interface ResponseVacancy {
  id: number;
  name: string;
  description: string;
  numOfPositions: number;
  status: boolean;
  isPublished: boolean;
  jobTitle: JobTitle;
  hiringManager: HiringManager;
}
