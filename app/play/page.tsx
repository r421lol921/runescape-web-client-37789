import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/app/components/Navbar";
import GameClient from "@/app/components/GameClient";

export default async function PlayPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const username =
    profile?.username ?? user.user_metadata?.username ?? user.email?.split("@")[0] ?? "Adventurer";

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col">
      <Navbar username={username} />
      <main className="flex-1 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="px-4 py-2 border-b border-[#3a3a3a] bg-[#242424]">
            <h1 className="text-sm font-semibold text-[#f0ede8]">Playing as <span className="text-[#c8a96e]">{username}</span></h1>
          </div>
          <div className="flex-1 overflow-hidden">
            <GameClient />
          </div>
        </div>
      </main>
    </div>
  );
}
