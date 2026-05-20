export default function Login() {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">
        Login
      </h1>

      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded border p-3"
        />

        <button
          className="rounded bg-black p-3 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}