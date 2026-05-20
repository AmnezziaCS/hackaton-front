import companiesData from "../data/companies.json";
import type { Company } from "../types/company";

export async function getCompanies(): Promise<Company[]> {
  return companiesData as Company[];
}
