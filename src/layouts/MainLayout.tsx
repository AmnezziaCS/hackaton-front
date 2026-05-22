import { Outlet, Link, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-8 py-4">
          <Link to="/" className="text-lg font-bold text-[#00296B] tracking-tight">
            goto<span className="text-[#FFC300]">job</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/jobs" className="text-sm text-[#3B3B3B] hover:text-[#00296B] transition-colors">
              Offres
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-[#3B3B3B] hover:text-[#00296B] transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-[#00296B] text-white text-sm px-4 py-2 hover:bg-[#001f52] transition-colors"
            >
              Créer un compte
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}