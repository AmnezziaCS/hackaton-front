import { useState } from "react";

const mockStudent = {
  name: "Hugo Houdain",
  surname: "Houdinho",
  dateOfBirth: "2002-05-15",
  address: "10 rue Watteau, Lille",
};

export default function StudentProfile() {
  const [form, setForm] = useState(mockStudent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    // API
    console.log(form);
  };

  return (
    <div>
      <h1>Mon profil</h1>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="surname" value={form.surname} onChange={handleChange} />
      <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
      <input name="address" value={form.address} onChange={handleChange} />
      <button onClick={handleSubmit}>Sauvegarder</button>
    </div>
  );
}