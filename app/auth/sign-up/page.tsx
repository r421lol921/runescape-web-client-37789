"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: { username },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth/sign-up-success");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="w-full max-w-sm">
        {/* Logo + title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Image src="/logo.png" alt="PeytOtoria logo" width={72} height={72} />
          <h1 className="text-2xl font-bold text-[#f0ede8] tracking-tight">PeytOtoria</h1>
          <p className="text-sm text-[#8a8480]">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-6 flex flex-col gap-4">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-medium text-[#8a8480] uppercase tracking-wider">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="CoolAdventurer"
                className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#8a8480] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-[#8a8480] uppercase tracking-wider">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#8a8480] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-[#8a8480] uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#8a8480] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className="text-xs font-medium text-[#8a8480] uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-lg px-3 py-2.5 text-sm text-[#f0ede8] placeholder-[#8a8480] focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-[#e05c5c] bg-[#e05c5c]/10 border border-[#e05c5c]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#c8a96e] text-[#1a1a1a] font-semibold text-sm hover:bg-[#a8894e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#8a8480] mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#c8a96e] hover:text-[#a8894e] font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
