import { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationsService";
import { getCompanies } from "../../services/companiesService";
import { getJobs } from "../../services/jobsService";
import { getUsers } from "../../services/usersService";
import type { Application } from "../../types/application";
import type { Announcement } from "../../types/announcement";
import type { Company } from "../../types/company";
import type { User } from "../../types/auth";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Announcement[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [usersData, companiesData, jobsData, applicationsData] = await Promise.all([
          getUsers(),
          getCompanies(),
          getJobs(),
          getApplications(),
        ]);

        setUsers(usersData);
        setCompanies(companiesData);
        setJobs(jobsData);
        setApplications(applicationsData);
      } catch {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  const studentsCount = users.filter((user) => user.role === "STUDENT").length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Users</p>
          <p className="mt-2 text-2xl font-bold">{users.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Students</p>
          <p className="mt-2 text-2xl font-bold">{studentsCount}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Companies</p>
          <p className="mt-2 text-2xl font-bold">{companies.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Jobs</p>
          <p className="mt-2 text-2xl font-bold">{jobs.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Applications</p>
          <p className="mt-2 text-2xl font-bold">{applications.length}</p>
        </div>
      </div>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Dernieres offres publiees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-2 py-2">Titre</th>
                <th className="px-2 py-2">Entreprise</th>
                <th className="px-2 py-2">Date</th>
                <th className="px-2 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td className="px-2 py-3 text-gray-500" colSpan={4}>
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.slice(0, 5).map((job) => (
                  <tr key={job.id}>
                    <td className="px-2 py-3">{job.title}</td>
                    <td className="px-2 py-3">{job.company}</td>
                    <td className="px-2 py-3">-</td>
                    <td className="px-2 py-3">{job.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Activite recente</h2>
        <p className="text-sm text-gray-500">
          {applications.length > 0 ? `${applications.length} candidatures chargees.` : "Aucune activite recente."}
        </p>
      </section>
    </div>
  );
}