"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ROLES = [
  { value: "customer", label: "Customer", description: "Submit and track your support tickets" },
  { value: "agent", label: "Support Agent", description: "Manage and resolve customer tickets" },
  { value: "admin", label: "Admin", description: "Full access to analytics and settings" },
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const passwordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = passwordStrength();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-green-500"][strength];

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Could not create account. Please try again.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-indigo-600 p-12 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-indigo-400/20 blur-2xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Support AI</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Start automating your support in minutes.
          </h2>
          <p className="text-indigo-100 text-sm leading-relaxed max-w-sm">
            Join 1,000+ companies using Support AI to handle tickets, automate replies, and deliver exceptional customer experiences.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              { value: "95%", label: "CSAT Score" },
              { value: "80%", label: "Auto-resolved" },
              { value: "24/7", label: "Always on" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-indigo-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-indigo-200/60 text-xs">
          © {new Date().getFullYear()} Support AI. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 bg-[#F6F8FD] overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-indigo-900">Support AI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h1>
            <p className="mt-2 text-slate-500 text-sm">Get started for free. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">Work email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {password && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength ? strengthColor : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Password strength:{" "}
                    <span className="font-semibold text-slate-700">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Role selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">I am a…</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`rounded-xl border p-3 text-left transition-all duration-200 ${
                      role === r.value
                        ? "border-indigo-500 bg-indigo-50 shadow-sm shadow-indigo-100"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className={`text-xs font-bold mb-0.5 ${role === r.value ? "text-indigo-700" : "text-slate-700"}`}>
                      {r.label}
                    </div>
                    <div className="text-[10px] leading-tight text-slate-400">{r.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mt-0.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create free account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">Already have an account?</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            Sign in instead
          </Link>

          <p className="mt-6 text-center text-xs text-slate-400">
            By creating an account you agree to our{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Terms</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
