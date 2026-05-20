import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Modal from "../../components/admin/Modal";
import { getCompanies } from "../../services/companiesService";
import { getJobs } from "../../services/jobsService";
import type { Announcement, AnnouncementStatus } from "../../types/announcement";
import type { Company } from "../../types/company";

export default function AdminJobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<Announcement[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [expiration, setExpiration] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");
        const [jobsData, companiesData] = await Promise.all([getJobs(), getCompanies()]);
        setJobs(jobsData);
        setCompanies(companiesData);
      } catch {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    void loadJobs();
  }, []);

  const createJob = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !company || !expiration) return;
    const normalizedCompany = company.trim();
    const companyExists = companies.some(
      (item) => item.name.toLowerCase() === normalizedCompany.toLowerCase(),
    );
    if (!companyExists) {
      setPopupMessage("Cette company n'existe pas. Il faut la creer d'abord.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expirationDate = new Date(expiration);
    expirationDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(
      (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays < 15) {
      setPopupMessage(
        diffDays < 0
          ? "La date d'expiration est deja passee."
          : "La date d'expiration doit etre au moins a 15 jours.",
      );
      return;
    }

    const newJob: Announcement = {
      id: crypto.randomUUID(),
      title: title.trim(),
      company: normalizedCompany,
      status: "PENDING",
      expiration,
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
    setTitle("");
    setCompany("");
    setExpiration("");
    setPopupMessage("");
  };

  const updateStatus = (jobId: string, status: AnnouncementStatus) => {
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === jobId ? { ...job, status } : job)));
  };

  const deleteJob = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des offres d'emploi</h1>

      <form className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4" onSubmit={createJob}>
        <input
          className="rounded border p-2"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="rounded border p-2"
          placeholder="Company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <input
          className="rounded border p-2"
          type="date"
          value={expiration}
          onChange={(event) => setExpiration(event.target.value)}
        />
        <button type="submit" className="rounded bg-black px-3 py-2 text-white">
          Create job
        </button>
      </form>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Statuts possibles</h2>
        <div className="flex flex-wrap gap-2">
          <span className="rounded bg-yellow-100 px-3 py-1 text-yellow-900">PENDING</span>
          <span className="rounded bg-green-100 px-3 py-1 text-green-900">APPROVED</span>
          <span className="rounded bg-red-100 px-3 py-1 text-red-900">REJECTED</span>
          <span className="rounded bg-gray-200 px-3 py-1 text-gray-800">EXPIRED</span>
        </div>
      </section>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Table jobs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-2 py-2">Title</th>
                <th className="px-2 py-2">Company</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Expiration</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td className="px-2 py-3 text-gray-500" colSpan={5}>
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-b last:border-0">
                    <td className="px-2 py-3">{job.title}</td>
                    <td className="px-2 py-3">{job.company}</td>
                    <td className="px-2 py-3">{job.status}</td>
                    <td className="px-2 py-3">{job.expiration}</td>
                    <td className="px-2 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded border px-2 py-1"
                          onClick={() => updateStatus(job.id, "APPROVED")}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 py-1"
                          onClick={() => updateStatus(job.id, "REJECTED")}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-600 px-2 py-1 text-red-600"
                          onClick={() => deleteJob(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={Boolean(popupMessage)} title="Information">
        <p className="text-sm text-gray-700">{popupMessage}</p>
        <div className="mt-4">
          <button
            type="button"
            className="rounded bg-black px-3 py-2 text-white"
            onClick={() => setPopupMessage("")}
          >
            Fermer
          </button>
        </div>
      </Modal>
    </div>
  );
}