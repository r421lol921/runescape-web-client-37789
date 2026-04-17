"use client";

const SKILLS = [
  { key: "attack",       label: "Attack",       color: "#e05c5c" },
  { key: "hitpoints",    label: "Hitpoints",    color: "#e05c5c" },
  { key: "mining",       label: "Mining",       color: "#8a8480" },
  { key: "strength",     label: "Strength",     color: "#e05c5c" },
  { key: "agility",      label: "Agility",      color: "#5cb8b2" },
  { key: "smithing",     label: "Smithing",     color: "#8a8480" },
  { key: "defence",      label: "Defence",      color: "#5b7fbe" },
  { key: "herblore",     label: "Herblore",     color: "#5cb85c" },
  { key: "fishing",      label: "Fishing",      color: "#5b7fbe" },
  { key: "ranged",       label: "Ranged",       color: "#5cb85c" },
  { key: "thieving",     label: "Thieving",     color: "#9b59b6" },
  { key: "cooking",      label: "Cooking",      color: "#e67e22" },
  { key: "prayer",       label: "Prayer",       color: "#f0ede8" },
  { key: "crafting",     label: "Crafting",     color: "#e67e22" },
  { key: "firemaking",   label: "Firemaking",   color: "#e67e22" },
  { key: "magic",        label: "Magic",        color: "#5b7fbe" },
  { key: "fletching",    label: "Fletching",    color: "#5cb85c" },
  { key: "woodcutting",  label: "Woodcutting",  color: "#5cb85c" },
  { key: "runecraft",    label: "Runecraft",    color: "#c8a96e" },
  { key: "slayer",       label: "Slayer",       color: "#e05c5c" },
  { key: "farming",      label: "Farming",      color: "#5cb85c" },
  { key: "construction", label: "Construction", color: "#c8a96e" },
  { key: "hunter",       label: "Hunter",       color: "#8a8480" },
];

interface SkillData {
  level: number;
  xp: number;
}

interface StatsGridProps {
  skills: Record<string, SkillData>;
  totalLevel: number;
  totalXp: number;
  combatLevel: number;
}

function xpForLevel(level: number): number {
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7));
  }
  return Math.floor(xp / 4);
}

function levelProgress(xp: number, level: number): number {
  if (level >= 99) return 100;
  const current = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return Math.min(100, Math.floor(((xp - current) / (next - current)) * 100));
}

export default function StatsGrid({ skills, totalLevel, totalXp, combatLevel }: StatsGridProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-[#8a8480] uppercase tracking-wider">Total Level</span>
          <span className="text-2xl font-bold text-[#c8a96e]">{totalLevel}</span>
        </div>
        <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-[#8a8480] uppercase tracking-wider">Combat Level</span>
          <span className="text-2xl font-bold text-[#e05c5c]">{combatLevel}</span>
        </div>
        <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-[#8a8480] uppercase tracking-wider">Total XP</span>
          <span className="text-2xl font-bold text-[#f0ede8]">{totalXp.toLocaleString()}</span>
        </div>
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {SKILLS.map((skill) => {
          const data = skills[skill.key] ?? { level: 1, xp: 0 };
          const progress = levelProgress(data.xp, data.level);

          return (
            <div
              key={skill.key}
              className="bg-[#242424] border border-[#3a3a3a] rounded-lg p-3 flex flex-col gap-2 hover:border-[#c8a96e]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8a8480]">{skill.label}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: skill.color }}
                >
                  {data.level}
                </span>
              </div>
              {/* XP bar */}
              <div className="w-full h-1 bg-[#3a3a3a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: skill.color,
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="text-[10px] text-[#8a8480]">
                {data.xp.toLocaleString()} xp
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
