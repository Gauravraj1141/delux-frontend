"use client";

import { Headphones } from "lucide-react";
import { useListenerCount } from "@/lib/useListenerCount";

const glass = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(12px) saturate(1.3)",
  WebkitBackdropFilter: "blur(12px) saturate(1.3)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow:
    "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
} as const;

export default function Header() {
  const listenerCount = useListenerCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-[50] px-3 md:px-6 lg:px-8 py-2.5 md:py-3.5 pointer-events-none">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Logo */}
        <div className="pointer-events-auto flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="Deluxe Salon Songs"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full"
          />
        </div>

        {/* Listener count — hidden until API responds */}
        {listenerCount !== null && (
          <div
            className="pointer-events-auto flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
            style={glass}
          >
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse-dot flex-shrink-0" />
            <span className="text-[11px] md:text-[12px] text-white/70 font-semibold tabular-nums">
              {listenerCount.toLocaleString()}
            </span>
            {/* Mobile: headphone icon */}
            <Headphones size={13} className="md:hidden text-white/60" />
            {/* Desktop: "Listening" text */}
            <span className="hidden md:inline text-[11px] text-white/50 font-medium">
              Listening
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
