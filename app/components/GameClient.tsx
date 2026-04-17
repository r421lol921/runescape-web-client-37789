"use client";

export default function GameClient() {
  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3a3a3a]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#e05c5c]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#c8a96e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#5cb85c]" />
        <span className="text-xs text-[#8a8480] ml-2">PeytOtoria Client</span>
      </div>
      <div className="relative w-full bg-black" style={{ paddingTop: "65.75%" }}>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#8a8480] mb-4">Game client loading...</p>
            <p className="text-sm text-[#5cb85c]">The RuneScape-based game engine is being prepared.</p>
            <p className="text-xs text-[#c8a96e] mt-4">Built with the OSRS client engine</p>
          </div>
        </div>
      </div>
    </div>
  );
}
