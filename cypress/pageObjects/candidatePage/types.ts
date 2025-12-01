export interface NewCandidate {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  keywords: string;
  comment: string;
  dateOfApplication: string;
  consentToKeepData: boolean;
  vacancyId: number;
}

export interface HiringManager {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  terminationId: number;
}

export interface CandidateVacancy {
  id: number;
  name: string;
  status: boolean;
  hiringManager: HiringManager;
}

export interface CandidateStatus {
  id: number;
  label: string;
}

export interface ResponseCandidate {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfApplication: string;
  vacancy: CandidateVacancy;
  status: CandidateStatus;
  hasAttachment: boolean;
  deletable: boolean;
}
