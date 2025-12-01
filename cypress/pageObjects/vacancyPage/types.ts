export interface NewVacancy {
  name: string;
  jobTitleId: number;
  employeeId: number;
  numOfPositions: number;
  description: string;
  status: boolean;
  isPublished: boolean;
}

export interface ResponseVacancy {
  id: number;
  name: string;
  description: string;
  numOfPositions: number;
  status: boolean;
  isPublished: boolean;
}
