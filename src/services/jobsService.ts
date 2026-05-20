import jobsData from "../data/jobs.json";
import type { Announcement } from "../types/announcement";

export async function getJobs(): Promise<Announcement[]> {
  return jobsData as Announcement[];
}
