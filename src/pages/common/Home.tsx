import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="px-8 pt-16 pb-12 max-w-4xl mx-auto">
        <div className="inline-block bg-[#00296B] text-white text-xs font-medium px-3 py-1 rounded mb-8 tracking-widest uppercase">
          Alternance & Stage · France
        </div>

        <h1 className="text-6xl font-bold text-[#00296B] leading-none mb-6">
          Trouvez votre<br />
          <span className="text-[#FFC300]">alternance.</span>
        </h1>

        <p className="text-[#3B3B3B] text-lg max-w-md mb-10">
          La plateforme qui connecte étudiants, écoles et entreprises pour simplifier le recrutement en alternance et stage.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-[#00296B] text-white px-8 py-3 text-sm font-medium hover:bg-[#001f52] transition-colors"
          >
            Voir les offres
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-[#00296B] text-[#00296B] px-8 py-3 text-sm font-medium hover:bg-[#00296B] hover:text-white transition-colors"
          >
            Créer un compte
          </button>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="bg-white px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#3B3B3B]/50 uppercase tracking-widest mb-10">Comment ça marche</p>
          <div className="grid grid-cols-3 gap-12">
            <div>
              <p className="text-5xl font-bold text-[#FFC300] mb-4">01</p>
              <p className="text-sm font-medium text-[#00296B] mb-2">Créez votre profil</p>
              <p className="text-sm text-[#3B3B3B]/60">Étudiant, école ou entreprise — inscrivez-vous en quelques minutes.</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#FFC300] mb-4">02</p>
              <p className="text-sm font-medium text-[#00296B] mb-2">Trouvez ou publiez</p>
              <p className="text-sm text-[#3B3B3B]/60">Parcourez les offres ou publiez vos annonces d'alternance.</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#FFC300] mb-4">03</p>
              <p className="text-sm font-medium text-[#00296B] mb-2">Candidatez</p>
              <p className="text-sm text-[#3B3B3B]/60">Suivez vos candidatures et gérez vos contrats en un seul endroit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA bas */}
      <div className="bg-[#00296B] px-8 py-16">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-white text-2xl font-bold mb-2">Prêt à commencer ?</p>
            <p className="text-white/50 text-sm">Rejoignez des milliers d'étudiants et d'entreprises.</p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#FFC300] text-[#00296B] px-8 py-3 text-sm font-bold hover:bg-[#E6B000] transition-colors flex-shrink-0"
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}