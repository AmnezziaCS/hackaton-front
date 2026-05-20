import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Email ou mot de passe invalide.");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="rounded border p-3"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded border p-3"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit" className="rounded bg-black p-3 text-white">
          Login
        </button>
      </form>
    </div>
  );
}