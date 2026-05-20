import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Modal from "../../components/admin/Modal";
import { getCompanies } from "../../services/companiesService";
import { getJobs } from "../../services/jobsService";
import type { Company } from "../../types/company";
import type { Announcement } from "../../types/announcement";

export default function Companies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Announcement[]>([]);
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [website, setWebsite] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingSector, setEditingSector] = useState("");
  const [editingWebsite, setEditingWebsite] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");
        const [companiesData, jobsData] = await Promise.all([getCompanies(), getJobs()]);
        setCompanies(companiesData);
        setJobs(jobsData);
      } catch {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  const createCompany = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !sector.trim() || !website.trim()) return;
    const normalizedName = name.trim();
    const duplicateName = companies.some(
      (companyItem) => companyItem.name.toLowerCase() === normalizedName.toLowerCase(),
    );
    if (duplicateName) {
      setPopupMessage("Le nom de company existe deja.");
      return;
    }

    setCompanies((prev) => [
      {
        id: crypto.randomUUID(),
        name: normalizedName,
        sector: sector.trim(),
        website: website.trim(),
      },
      ...prev,
    ]);
    setName("");
    setSector("");
    setWebsite("");
    setPopupMessage("");
  };

  const startEdit = (company: Company) => {
    setEditingId(company.id);
    setEditingName(company.name);
    setEditingSector(company.sector);
    setEditingWebsite(company.website);
  };

  const saveEdit = (companyId: string) => {
    const normalizedName = editingName.trim();
    const duplicateName = companies.some(
      (companyItem) =>
        companyItem.id !== companyId && companyItem.name.toLowerCase() === normalizedName.toLowerCase(),
    );
    if (duplicateName) {
      setPopupMessage("Le nom de company existe deja.");
      return;
    }

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              name: normalizedName,
              sector: editingSector.trim(),
              website: editingWebsite.trim(),
            }
          : company,
      ),
    );
    setEditingId(null);
    setPopupMessage("");
  };

  const deleteCompany = (companyId: string) => {
    setCompanies((prev) => prev.filter((company) => company.id !== companyId));
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des entreprises</h1>

      <form className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4" onSubmit={createCompany}>
        <input
          className="rounded border p-2"
          placeholder="Nom societe"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="rounded border p-2"
          placeholder="Secteur"
          value={sector}
          onChange={(event) => setSector(event.target.value)}
        />
        <input
          className="rounded border p-2"
          placeholder="Site web"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
        <button type="submit" className="rounded bg-black px-3 py-2 text-white">
          Create company
        </button>
      </form>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Table companies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-2 py-2">Nom societe</th>
                <th className="px-2 py-2">Secteur</th>
                <th className="px-2 py-2">Site web</th>
                <th className="px-2 py-2">Nombre d'offres</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td className="px-2 py-3 text-gray-500" colSpan={5}>
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((company) => {
                  const jobsCount = jobs.filter((job) => job.company === company.name).length;
                  return (
                    <tr key={company.id} className="border-b last:border-0">
                      <td className="px-2 py-3">
                        {editingId === company.id ? (
                          <input
                            className="rounded border p-1"
                            value={editingName}
                            onChange={(event) => setEditingName(event.target.value)}
                          />
                        ) : (
                          company.name
                        )}
                      </td>
                      <td className="px-2 py-3">
                        {editingId === company.id ? (
                          <input
                            className="rounded border p-1"
                            value={editingSector}
                            onChange={(event) => setEditingSector(event.target.value)}
                          />
                        ) : (
                          company.sector
                        )}
                      </td>
                      <td className="px-2 py-3">
                        {editingId === company.id ? (
                          <input
                            className="rounded border p-1"
                            value={editingWebsite}
                            onChange={(event) => setEditingWebsite(event.target.value)}
                          />
                        ) : (
                          company.website
                        )}
                      </td>
                      <td className="px-2 py-3">{jobsCount}</td>
                      <td className="px-2 py-3">
                        <div className="flex gap-2">
                          {editingId === company.id ? (
                            <button
                              type="button"
                              className="rounded bg-black px-2 py-1 text-white"
                              onClick={() => saveEdit(company.id)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="rounded border px-2 py-1"
                              onClick={() => startEdit(company)}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            type="button"
                            className="rounded border border-red-600 px-2 py-1 text-red-600"
                            onClick={() => deleteCompany(company.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
