import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfileType = "student" | "company" | "school" | null;

const profiles = [
  { key: "student" as ProfileType, label: "Étudiant", desc: "Candidater à des offres, gérer mon CV", icon: "🎓" },
  { key: "company" as ProfileType, label: "Entreprise", desc: "Publier des annonces, gérer les candidatures", icon: "🏢" },
  { key: "school" as ProfileType, label: "École", desc: "Suivre les étudiants, valider les contrats", icon: "🏫" },
];

export default function Register() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ProfileType>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      let url = "";
      let body = {};

      if (selected === "student") {
        url = "http://localhost:3001/students/signup";
        body = {
          email: form.email,
          password: form.password,
          name: form.name,
          surname: form.surname,
          dateOfBirth: form.dateOfBirth,
          address: form.address,
        };
      } else if (selected === "company") {
        url = "http://localhost:3003/companies/signup";
        body = {
          email: form.email,
          password: form.password,
          name: form.name,
          siret: form.siret,
        };
      } else if (selected === "school") {
        url = "http://localhost:3002/schools/signup";
        body = {
          email: form.email,
          password: form.password,
          name: form.name,
          siret: form.siret,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue.");
      } else {
        navigate("/login");
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-1">Créer un compte</h1>
        <p className="text-sm text-gray-500 mb-6">
          {selected ? "Remplissez vos informations." : "Choisissez votre profil pour commencer."}
        </p>

        {!selected ? (
          <>
            <div className="flex flex-col gap-3">
              {profiles.map((p) => (
                <div
                  key={p.key}
                  onClick={() => setSelected(p.key)}
                  className="border border-gray-200 rounded-xl p-4 hover:border-[#FFC300] hover:bg-yellow-50 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{p.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                  </div>
                  <span className="text-[#FFC300]">›</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 mt-6">
              Déjà un compte ?{" "}
              <span onClick={() => navigate("/login")} className="text-[#00296B] font-medium cursor-pointer hover:underline">
                Se connecter
              </span>
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-[#00296B] w-fit">
              ← Changer de profil
            </button>

            <Field label="Email" name="email" type="email" onChange={handleChange} />
            <Field label="Mot de passe" name="password" type="password" onChange={handleChange} />

            {selected === "student" && (
              <>
                <Field label="Prénom" name="name" onChange={handleChange} />
                <Field label="Nom" name="surname" onChange={handleChange} />
                <Field label="Date de naissance" name="dateOfBirth" type="date" onChange={handleChange} />
                <Field label="Adresse" name="address" onChange={handleChange} />
              </>
            )}

            {selected === "company" && (
              <Field label="Nom de l'entreprise" name="name" onChange={handleChange} />
            )}

            {selected === "school" && (
              <Field label="Nom de l'école" name="name" onChange={handleChange} />
            )}

            {(selected === "company" || selected === "school") && (
              <Field label="Numéro de Siret" name="siret" onChange={handleChange} />
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#FFC300] hover:bg-[#E6B000] text-[#00296B] px-6 py-2.5 rounded-lg text-sm font-medium mt-2 disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Créer mon compte"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FFC300]"
      />
    </div>
  );
}