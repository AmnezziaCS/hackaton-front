import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AdminGuard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Acces refuse</h1>
        <p className="mt-2 text-gray-600">Vous devez etre admin pour acceder a cette page.</p>
      </div>
    );
  }

  return <Outlet />;
}
