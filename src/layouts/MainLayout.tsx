import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold">
            JobBoard
          </Link>

          <nav className="flex gap-4">
            <Link to="/jobs">Jobs</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}