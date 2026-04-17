import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/app/components/Navbar";
import StatsGrid from "@/app/components/StatsGrid";

interface SkillData {
  level: number;
  xp: number;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, created_at")
    .eq("id", user.id)
    .single();

  // Fetch stats
  const { data: stats } = await supabase
    .from("player_stats")
    .select("total_level, total_xp, combat_level, skills")
    .eq("user_id", user.id)
    .single();

  const skills = (stats?.skills ?? {}) as Record<string, SkillData>;

  // Calculate totals from skills if not pre-computed
  const totalLevel =
    stats?.total_level && stats.total_level > 0
      ? stats.total_level
      : Object.values(skills).reduce((sum, s) => sum + (s?.level ?? 1), 0);

  const totalXp =
    stats?.total_xp && stats.total_xp > 0
      ? stats.total_xp
      : Object.values(skills).reduce((sum, s) => sum + (s?.xp ?? 0), 0);

  const combatLevel = stats?.combat_level ?? 3;

  const username =
    profile?.username ?? user.user_metadata?.username ?? user.email?.split("@")[0] ?? "Adventurer";

  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar username={username} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Player header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#8a8480] uppercase tracking-wider">Welcome back</p>
            <h1 className="text-3xl font-bold text-[#f0ede8] text-balance">{username}</h1>
            {joinDate && (
              <p className="text-sm text-[#8a8480]">Member since {joinDate}</p>
            )}
          </div>

          <Link
            href="/play"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#c8a96e] text-[#1a1a1a] font-semibold text-sm hover:bg-[#a8894e] transition-colors self-start sm:self-auto"
          >
            Play Now
          </Link>
        </div>

        {/* Stats section */}
        <div className="flex flex-col gap-3 mb-6">
          <h2 className="text-sm font-semibold text-[#8a8480] uppercase tracking-wider">
            Player Stats
          </h2>
          <StatsGrid
            skills={skills}
            totalLevel={totalLevel}
            totalXp={totalXp}
            combatLevel={combatLevel}
          />
        </div>
      </main>
    </div>
  );
}
