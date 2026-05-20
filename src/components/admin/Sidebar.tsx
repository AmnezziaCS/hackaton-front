import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded px-2 py-1 ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"}`;

  return (
    <aside className="flex w-64 flex-col bg-black p-4 text-white">
      <h2 className="mb-6 text-2xl font-bold">Admin</h2>

      <div className="mb-6 flex items-center gap-3 rounded bg-white/10 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </div>
        <div>
          <p className="text-sm font-semibold">{user?.name ?? "Admin"}</p>
          <p className="text-xs text-gray-300">{user?.email ?? "-"}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        <NavLink to="/admin/dashboard" className={getLinkClassName}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={getLinkClassName}>
          Users
        </NavLink>
        <NavLink to="/admin/jobs" className={getLinkClassName}>
          Jobs
        </NavLink>
        <NavLink to="/admin/companies" className={getLinkClassName}>
          Companies
        </NavLink>
        <NavLink to="/admin/applications" className={getLinkClassName}>
          Applications
        </NavLink>
        <NavLink to="/admin/settings" className={getLinkClassName}>
          Settings
        </NavLink>
      </nav>

      <button
        type="button"
        className="mt-6 rounded border border-white px-3 py-2 text-left"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}
