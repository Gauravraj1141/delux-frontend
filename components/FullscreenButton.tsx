"use client";

import { useState, useCallback, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      className="fixed bottom-6 right-6 z-[100] p-2.5 rounded-full cursor-pointer transition-opacity duration-200 hover:opacity-80 hidden md:block"
      style={{
        background: "rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(8px) saturate(1.2)",
        WebkitBackdropFilter: "blur(8px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow:
          "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {isFullscreen ? (
        <Minimize size={16} className="text-white/70" />
      ) : (
        <Maximize size={16} className="text-white/70" />
      )}
    </button>
  );
}
