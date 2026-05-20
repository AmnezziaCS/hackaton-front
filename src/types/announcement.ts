export type AnnouncementStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export type Announcement = {
  id: string;
  title: string;
  company: string;
  status: AnnouncementStatus;
  expiration: string;
};
