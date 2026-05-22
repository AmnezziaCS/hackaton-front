import { useState } from "react";

type JobStatus = "LOOKING" | "NOT_LOOKING";

export default function StudentStatus() {
  const [status, setStatus] = useState<JobStatus>("NOT_LOOKING");

  const handleSubmit = () => {
    // API
    console.log(status);
  };

  return (
    <div>
      <h1>Mon statut</h1>
      <label>
        <input
          type="radio"
          name="status"
          value="LOOKING"
          checked={status === "LOOKING"}
          onChange={() => setStatus("LOOKING")}
        />
        En recherche
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="NOT_LOOKING"
          checked={status === "NOT_LOOKING"}
          onChange={() => setStatus("NOT_LOOKING")}
        />
        Pas en recherche
      </label>
      <button onClick={handleSubmit}>Sauvegarder</button>
    </div>
  );
}