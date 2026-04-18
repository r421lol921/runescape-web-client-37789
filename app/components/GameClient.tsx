"use client";

import { useEffect, useRef } from "react";

export default function GameClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { Game } = await import("../../osrs/Game");
        if (!mounted || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const game = new Game(canvas);
        game.initializeApplication(canvas.width, canvas.height);
      } catch (err) {
        console.error("[v0] Failed to start game:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-[#242424] border border-[#3a3a3a] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3a3a3a]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#e05c5c]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#c8a96e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#5cb85c]" />
        <span className="text-xs text-[#8a8480] ml-2">PeytOtoria Client</span>
      </div>
      <div className="flex justify-center bg-black">
        <canvas
          ref={canvasRef}
          width={765}
          height={503}
          tabIndex={1}
          onContextMenu={(e) => e.preventDefault()}
          className="block"
        />
      </div>
    </div>
  );
}
