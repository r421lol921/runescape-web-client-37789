import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Navbar */}
      <header className="border-b border-[#3a3a3a]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="PeytOtoria" width={32} height={32} />
            <span className="font-bold text-[#f0ede8] text-sm tracking-tight">PeytOtoria</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-[#8a8480] hover:text-[#f0ede8] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-sm px-3 py-1.5 rounded-lg bg-[#c8a96e] text-[#1a1a1a] font-semibold hover:bg-[#a8894e] transition-colors"
            >
              Play Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <Image
            src="/logo.png"
            alt="PeytOtoria"
            width={96}
            height={96}
            className="drop-shadow-lg"
          />
          <h1 className="text-5xl font-bold text-[#f0ede8] text-balance leading-tight">
            Welcome to <span className="text-[#c8a96e]">PeytOtoria</span>
          </h1>
          <p className="text-lg text-[#8a8480] leading-relaxed text-pretty max-w-lg">
            A classic RSPS experience — playable right in your browser. Train skills, fight monsters, and adventure through the world of PeytOtoria.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href="/auth/sign-up"
              className="px-6 py-3 rounded-lg bg-[#c8a96e] text-[#1a1a1a] font-semibold hover:bg-[#a8894e] transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/auth/login"
              className="px-6 py-3 rounded-lg border border-[#3a3a3a] text-[#f0ede8] font-semibold hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "23 Skills to Train",
              desc: "From mining and woodcutting to magic and slayer — master every skill.",
              accent: "#c8a96e",
            },
            {
              title: "Browser-Based",
              desc: "No downloads required. Launch PeytOtoria from any device, any time.",
              accent: "#5b7fbe",
            },
            {
              title: "Track Your Stats",
              desc: "Your progress is saved to your account. Watch your character grow.",
              accent: "#5cb85c",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-5 flex flex-col gap-2 hover:border-[#c8a96e]/30 transition-colors"
            >
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: f.accent }}
              />
              <h3 className="text-sm font-semibold text-[#f0ede8]">{f.title}</h3>
              <p className="text-sm text-[#8a8480] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#3a3a3a] py-6 text-center">
        <p className="text-xs text-[#8a8480]">
          PeytOtoria &mdash; Not affiliated with Jagex or RuneScape.
        </p>
      </footer>
    </main>
  );
}
