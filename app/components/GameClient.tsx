"use client";

import { useRef } from "react";

export default function GameClient() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3a3a3a]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#e05c5c]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#c8a96e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#5cb85c]" />
        <span className="text-xs text-[#8a8480] ml-2">PeytOtoria Client</span>
      </div>
      <div className="relative w-full" style={{ paddingTop: "65.75%" }}>
        <iframe
          ref={iframeRef}
          src="/client"
          className="absolute inset-0 w-full h-full border-0"
          title="PeytOtoria Game Client"
          allowFullScreen
        />
      </div>
    </div>
  );
}
