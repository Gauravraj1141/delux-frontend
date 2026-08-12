"use client";

import Link from "next/link";
import { useLiveClock } from "@/lib/useLiveClock";
import { useListenerCount } from "@/lib/useListenerCount";

export default function Header() {
  const { time, date } = useLiveClock();
  const listenerCount = useListenerCount();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-4 md:px-6 lg:px-8 py-3 md:py-4">
      <div className="flex items-start justify-between">
        {/* Left: Clock + Listener count (md+ only, hidden on mobile — shown in Hero instead) */}
        <div className="hidden md:flex flex-col gap-0.5 pt-1">
          <p className="text-[22px] md:text-[26px] font-bold text-white/80 tracking-wide tabular-nums leading-tight">
            {time}
          </p>
          <p className="text-[9px] md:text-[10px] text-white/60 font-medium tracking-[0.2em] uppercase leading-tight mt-1.5">
            {date}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-[12px] md:text-[13px] text-white font-semibold">
              {listenerCount} listening
            </span>
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            <Link
              href="#playlists"
              className="text-[12px] text-white/70 hover:text-white transition-colors duration-200 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Playlists
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
