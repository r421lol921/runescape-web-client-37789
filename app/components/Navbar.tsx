"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  username?: string | null;
}

export default function Navbar({ username }: NavbarProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[#3a3a3a] bg-[#1a1a1a] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <Image src="/logo.png" alt="PeytOtoria" width={32} height={32} className="group-hover:opacity-80 transition-opacity" />
          <span className="font-bold text-[#f0ede8] tracking-tight text-sm">PeytOtoria</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-[#8a8480] hover:text-[#f0ede8] transition-colors">
            Dashboard
          </Link>
          <Link href="/play" className="text-sm text-[#8a8480] hover:text-[#f0ede8] transition-colors">
            Play
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          {username && (
            <span className="hidden sm:block text-sm text-[#8a8480]">
              {username}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="text-sm px-3 py-1.5 rounded-lg border border-[#3a3a3a] text-[#8a8480] hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
