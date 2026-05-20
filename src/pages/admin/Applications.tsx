import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { getApplications } from "../../services/applicationsService";
import type { Application, ApplicationStatus } from "../../types/application";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("PENDING");

  useEffect(() => {
    async function loadApplications() {
      try {
        setLoading(true);
        setError("");
        const applicationsData = await getApplications();
        setApplications(applicationsData);
      } catch {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    void loadApplications();
  }, []);

  const filteredApplications = useMemo(
    () =>
      applications.filter(
        (application) =>
          application.userId.toLowerCase().includes(search.toLowerCase()) ||
          application.jobId.toLowerCase().includes(search.toLowerCase()) ||
          application.status.toLowerCase().includes(search.toLowerCase()),
      ),
    [applications, search],
  );

  const createApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId.trim() || !jobId.trim()) return;
    setApplications((prev) => [
      { id: crypto.randomUUID(), userId: userId.trim(), jobId: jobId.trim(), status },
      ...prev,
    ]);
    setUserId("");
    setJobId("");
    setStatus("PENDING");
    setSearch("");
  };

  const updateStatus = (applicationId: string, nextStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId ? { ...application, status: nextStatus } : application,
      ),
    );
  };

  const deleteApplication = (applicationId: string) => {
    setApplications((prev) => prev.filter((application) => application.id !== applicationId));
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des candidatures</h1>

      <form className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4" onSubmit={createApplication}>
        <input
          className="rounded border p-2"
          placeholder="User ID"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <input
          className="rounded border p-2"
          placeholder="Job ID"
          value={jobId}
          onChange={(event) => setJobId(event.target.value)}
        />
        <select
          className="rounded border p-2"
          value={status}
          onChange={(event) => setStatus(event.target.value as ApplicationStatus)}
        >
          <option value="PENDING">PENDING</option>
          <option value="REVIEWED">REVIEWED</option>
          <option value="ACCEPTED">ACCEPTED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button type="submit" className="rounded bg-black px-3 py-2 text-white">
          Create application
        </button>
      </form>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Table applications</h2>
        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Recherche par userId, jobId ou status"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-2 py-2">User ID</th>
                <th className="px-2 py-2">Job ID</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td className="px-2 py-3 text-gray-500" colSpan={4}>
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application) => (
                  <tr key={application.id} className="border-b last:border-0">
                    <td className="px-2 py-3">{application.userId}</td>
                    <td className="px-2 py-3">{application.jobId}</td>
                    <td className="px-2 py-3">{application.status}</td>
                    <td className="px-2 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded border px-2 py-1"
                          onClick={() => updateStatus(application.id, "REVIEWED")}
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 py-1"
                          onClick={() => updateStatus(application.id, "ACCEPTED")}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 py-1"
                          onClick={() => updateStatus(application.id, "REJECTED")}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-600 px-2 py-1 text-red-600"
                          onClick={() => deleteApplication(application.id)}
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
    </div>
  );
}
