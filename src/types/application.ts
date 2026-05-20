export type ApplicationStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";

export type Application = {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
};
