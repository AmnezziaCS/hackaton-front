import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div className="font-semibold">Admin connecte: {user?.name ?? "Admin"}</div>
      <div className="flex items-center gap-3">
        <button type="button" className="rounded border px-3 py-1">
          Notifications
        </button>
      </div>
    </header>
  );
}
