import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Modal from "../../components/admin/Modal";
import { getUsers } from "../../services/usersService";
import type { User, UserRole } from "../../types/auth";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("STUDENT");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");
        const usersData = await getUsers();
        setUsers(usersData);
      } catch {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    }

    void loadUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, users],
  );

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditingName(user.name);
    setEditingEmail(user.email);
  };

  const saveEdit = (userId: string) => {
    const normalizedEmail = editingEmail.trim().toLowerCase();
    const emailExists = users.some(
      (user) => user.id !== userId && user.email.toLowerCase() === normalizedEmail,
    );

    if (emailExists) {
      setPopupMessage("Cet email existe deja.");
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, name: editingName.trim(), email: normalizedEmail } : user,
      ),
    );
    setPopupMessage("");
    setEditingId(null);
  };

  const deleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const createUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = newEmail.trim().toLowerCase();
    if (!newName.trim() || !normalizedEmail) return;

    const emailExists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      setPopupMessage("Cet email existe deja.");
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      email: normalizedEmail,
      password: "password123",
      role: newRole,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "ACTIVE",
    };

    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setNewName("");
    setNewEmail("");
    setNewRole("STUDENT");
    setSearch("");
    setPopupMessage("");
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>

      <form className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-4" onSubmit={createUser}>
        <input
          className="rounded border p-2"
          placeholder="Nom"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          className="rounded border p-2"
          placeholder="Email"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <select
          className="rounded border p-2"
          value={newRole}
          onChange={(event) => setNewRole(event.target.value as UserRole)}
        >
          <option value="STUDENT">STUDENT</option>
          <option value="COMPANY">COMPANY</option>
          <option value="SCHOOL">SCHOOL</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="rounded bg-black px-3 py-2 text-white">
          Create user
        </button>
      </form>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Table users</h2>
        <input
          className="mb-4 w-full rounded border p-2"
          placeholder="Recherche par nom, email ou role"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td className="px-2 py-3 text-gray-500" colSpan={4}>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="px-2 py-3">
                      {editingId === user.id ? (
                        <input
                          className="rounded border p-1"
                          value={editingName}
                          onChange={(event) => setEditingName(event.target.value)}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {editingId === user.id ? (
                        <input
                          className="rounded border p-1"
                          value={editingEmail}
                          onChange={(event) => setEditingEmail(event.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-2 py-3">{user.role}</td>
                    <td className="px-2 py-3">
                      <div className="flex gap-2">
                        {editingId === user.id ? (
                          <button
                            type="button"
                            className="rounded bg-black px-2 py-1 text-white"
                            onClick={() => saveEdit(user.id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="rounded border px-2 py-1"
                            onClick={() => startEdit(user)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded border border-red-600 px-2 py-1 text-red-600"
                          onClick={() => deleteUser(user.id)}
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