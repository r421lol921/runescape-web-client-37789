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
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar username={username} />
      <main className="flex flex-col items-center justify-start py-6 px-4">
        <div className="flex flex-col gap-4 w-full max-w-[800px]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-[#f0ede8]">Playing as <span className="text-[#c8a96e]">{username}</span></h1>
          </div>
          <GameClient />
        </div>
      </main>
    </div>
  );
}
