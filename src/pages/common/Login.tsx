import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfileType = "student" | "company" | "school" | null;
type LoginMode = "email" | "siret";

const profiles = [
  { key: "student" as ProfileType, label: "Étudiant", icon: "🎓" },
  { key: "company" as ProfileType, label: "Entreprise", icon: "🏢" },
  { key: "school" as ProfileType, label: "École", icon: "🏫" },
];

export default function Login() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ProfileType>(null);
  const [mode, setMode] = useState<LoginMode>("email");

  return (
    <div className="flex items-center justify-center px-4 pt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-1">Connexion</h1>
        <p className="text-sm text-gray-500 mb-6">
          {selected ? "Connectez-vous à votre compte." : "Choisissez votre profil."}
        </p>

        {!selected ? (
          <>
            <div className="flex flex-col gap-3">
              {profiles.map((p) => (
                <div
                  key={p.key}
                  onClick={() => { setSelected(p.key); setMode("email"); }}
                  className="border border-gray-200 rounded-xl p-4 hover:border-[#FFC300] hover:bg-yellow-50 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <p className="text-sm font-medium text-gray-900 flex-1">{p.label}</p>
                  <span className="text-[#FFC300]">›</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
              Pas encore de compte ?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#00296B] font-medium cursor-pointer hover:underline"
              >
                Créer un compte
              </span>
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-gray-400 hover:text-[#00296B] w-fit"
            >
              ← Changer de profil
            </button>

            {/* Toggle siret/email pour entreprise et école */}
            {(selected === "company" || selected === "school") && (
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("email")}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-colors ${
                    mode === "email"
                      ? "bg-[#00296B] text-white border-[#00296B]"
                      : "border-gray-200 text-gray-500 hover:border-[#00296B]"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setMode("siret")}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-colors ${
                    mode === "siret"
                      ? "bg-[#00296B] text-white border-[#00296B]"
                      : "border-gray-200 text-gray-500 hover:border-[#00296B]"
                  }`}
                >
                  Numéro de Siret
                </button>
              </div>
            )}

            {/* Formulaire email */}
            {mode === "email" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Email</label>
                  <input
                    type="email"
                    placeholder="exemple@mail.com"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FFC300]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Mot de passe</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FFC300]"
                  />
                </div>
              </>
            )}

            {/* Formulaire siret */}
            {mode === "siret" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Numéro de Siret</label>
                  <input
                    type="text"
                    placeholder="12345678901234"
                    maxLength={14}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FFC300]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Mot de passe</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FFC300]"
                  />
                </div>
              </>
            )}

            <button className="bg-[#FFC300] hover:bg-[#E6B000] text-[#00296B] px-6 py-2.5 rounded-lg text-sm font-medium">
              Se connecter
            </button>

            {/* OAuth pour étudiant */}
            {selected === "student" && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">ou continuer avec</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <button className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3">
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                    Continuer avec Google
                  </button>
                  <button className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3">
                    <img src="https://www.microsoft.com/favicon.ico" className="w-4 h-4" alt="Microsoft" />
                    Continuer avec Microsoft
                  </button>
                  <button className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3">
                    <img src="https://www.linkedin.com/favicon.ico" className="w-4 h-4" alt="LinkedIn" />
                    Continuer avec LinkedIn
                  </button>
                </div>
              </>
            )}

            <p className="text-xs text-center text-gray-500 mt-2">
              Pas encore de compte ?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#00296B] font-medium cursor-pointer hover:underline"
              >
                Créer un compte
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}