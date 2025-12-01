export interface NewJobTitle {
  title: string;
  description: string;
  note: string;
}

export interface JobSpecification {
  id: number;
  filename: string;
  fileType: string;
  fileSize: string;
}

export interface ResponseJobTitle {
  id: number;
  title: string;
  description: string;
  note: string;
  jobSpecification: JobSpecification;
}
