export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="rounded-lg bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Configuration plateforme</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">logo</span>
            <input className="rounded border p-2" placeholder="Logo URL" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">nom plateforme</span>
            <input className="rounded border p-2" placeholder="Nom plateforme" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">email support</span>
            <input className="rounded border p-2" placeholder="support@exemple.com" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">roles</span>
            <select className="rounded border p-2" defaultValue="">
              <option value="" disabled>
                Selectionner un role
              </option>
            </select>
          </label>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 font-semibold">permissions</h3>
          <p className="text-sm text-gray-500">Configuration des permissions.</p>
        </div>
      </section>
    </div>
  );
}
