import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/app/components/Navbar";
import StatsGrid from "@/app/components/StatsGrid";

interface SkillData {
  level: number;
  xp: number;
}

function computeCombatLevel(stats: Record<string, number>): number {
  const base =
    0.25 *
    ((stats.defence_level ?? 1) +
      (stats.hitpoints_level ?? 10) +
      Math.floor((stats.prayer_level ?? 1) / 2));
  const melee =
    (13 / 40) * ((stats.attack_level ?? 1) + (stats.strength_level ?? 1));
  const ranged = (13 / 40) * Math.floor((1.5 * (stats.ranged_level ?? 1)));
  const magic = (13 / 40) * Math.floor((1.5 * (stats.magic_level ?? 1)));
  return Math.floor(base + Math.max(melee, ranged, magic));
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

  // Fetch flat stats columns from DB
  const { data: stats } = await supabase
    .from("player_stats")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Map flat DB columns → skills object expected by StatsGrid
  const SKILL_KEYS = [
    "attack", "hitpoints", "mining", "strength", "agility", "smithing",
    "defence", "herblore", "fishing", "ranged", "thieving", "cooking",
    "prayer", "crafting", "firemaking", "magic", "fletching", "woodcutting",
    "runecraft", "slayer", "farming", "construction", "hunter",
  ] as const;

  const skills: Record<string, SkillData> = {};
  for (const key of SKILL_KEYS) {
    skills[key] = {
      level: (stats as Record<string, number> | null)?.[`${key}_level`] ?? (key === "hitpoints" ? 10 : 1),
      xp: (stats as Record<string, number> | null)?.[`${key}_xp`] ?? (key === "hitpoints" ? 1154 : 0),
    };
  }

  const totalLevel = stats?.total_level ?? SKILL_KEYS.length;
  const totalXp = stats?.total_xp ?? 1154;
  const combatLevel = computeCombatLevel(stats as Record<string, number> ?? {});

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
