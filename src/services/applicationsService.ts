import applicationsData from "../data/applications.json";
import type { Application } from "../types/application";

export async function getApplications(): Promise<Application[]> {
  return applicationsData as Application[];
}
