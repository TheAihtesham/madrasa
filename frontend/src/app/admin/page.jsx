"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authExpiry = localStorage.getItem("admin_auth_expiry");

    // If expiry exists & still valid -> redirect
    if (authExpiry && Date.now() < Number(authExpiry)) {
      router.replace("/admin/dashboard");
    } else {
      // If expired -> clear it
      localStorage.removeItem("admin_auth");
      localStorage.removeItem("admin_auth_expiry");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      localStorage.setItem("admin_auth", "true");

      // ✅ Set expiry time 15 minutes from now
      const expiryTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("admin_auth_expiry", expiryTime.toString());

      router.push("/admin/dashboard");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
