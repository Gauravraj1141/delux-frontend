"use client";

import { useLiveClock } from "@/lib/useLiveClock";
import { useListenerCount } from "@/lib/useListenerCount";

export default function Header() {
  const { time, date } = useLiveClock();
  const listenerCount = useListenerCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-[50] px-4 md:px-6 lg:px-8 py-3 md:py-4">
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

        {/* Right: Navigation (hidden for now) */}
      </div>
    </header>
  );
}
