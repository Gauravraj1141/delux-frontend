"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
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

        {/* Right: Navigation buttons */}
        <div className="flex flex-col items-end gap-2">
          {/* Row 1: Spotify + YT Music */}
          <div className="flex items-center gap-2">
            <a
              href={EXTERNAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-white/80 hover:text-white transition-colors duration-200 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#1DB954] flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </span>
              Spotify
            </a>
            <a
              href={EXTERNAL_LINKS.ytMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-white/80 hover:text-white transition-colors duration-200 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#FF0000] flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                  <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
                </svg>
              </span>
              YT Music
            </a>
          </div>

          {/* Row 2: Playlists + Songs + Install */}
          <nav className="flex items-center gap-2">
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
            <Link
              href="#songs"
              className="text-[12px] text-white/70 hover:text-white transition-colors duration-200 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Songs
            </Link>
            <button
              className="flex items-center gap-1 text-[12px] text-white/70 hover:text-white transition-colors duration-200 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              aria-label="Install"
            >
              <Download size={12} />
              Install
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
