"use client";

import { useEffect, useRef } from "react";

export default function GameClient() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "/client.html";
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      title="PeytOtoria Game Client"
      sandbox="allow-same-origin allow-scripts allow-forms"
    />
  );
}
