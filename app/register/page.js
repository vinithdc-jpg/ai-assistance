"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create account. Please try again.");
        return;
      }

      setMessage("Registration successful! Redirecting...");
      router.push(from);
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface py-16">
      <div className="container-page mx-auto max-w-xl rounded-4xl border border-line bg-white p-10 shadow-raised">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Register
          </p>
          <h1 className="mt-4 text-3xl font-bold text-ink">Create your account</h1>
          <p className="mt-3 text-sm text-muted">
            Start using AI customer support with a secure account.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-ink">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Your name"
              className="mt-3 w-full rounded-3xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="mt-3 w-full rounded-3xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="At least 6 characters"
              className="mt-3 w-full rounded-3xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-primary hover:text-primary/80">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
