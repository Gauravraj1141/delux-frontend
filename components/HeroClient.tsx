"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import RadioPlayer from "@/components/radio/RadioPlayer";
import { usePlaylist } from "@/components/radio/PlaylistContext";
import { useListenerCount } from "@/lib/useListenerCount";

const WeatherCard = dynamic(() => import("@/components/WeatherCard"), {
  ssr: false,
});

export function SmogEffects() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Top smog turbulent layers — desktop only */}
      <div
        className="absolute inset-x-0 top-0 z-[2] pointer-events-none"
        style={{ height: "55%" }}
      >
        <div
          className="absolute inset-x-[-10%] top-0 animate-smog-2"
          style={{
            height: "115%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.04) 60%, transparent 80%)",
            filter: "url(#smog-turbulence-1) blur(10px)",
          }}
        />
        <div
          className="absolute inset-x-[-15%] top-0 animate-smog-3"
          style={{
            height: "120%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.05) 45%, transparent 65%)",
            filter: "url(#smog-turbulence-3) blur(16px)",
          }}
        />
      </div>

      {/* SVG filters */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <filter id="smog-turbulence-1" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves={3} seed={2} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={80} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.025" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={100} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-3" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves={3} seed={13} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={120} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Rising smog turbulent layers — desktop only */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
        style={{ height: "70%" }}
      >
        <div
          className="absolute inset-x-[-10%] bottom-0 animate-smog-1"
          style={{
            height: "110%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 55%, transparent 75%)",
            filter: "url(#smog-turbulence-1) blur(8px)",
          }}
        />
        <div
          className="absolute inset-x-[-15%] bottom-0 animate-smog-2"
          style={{
            height: "115%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.05) 55%, transparent 70%)",
            filter: "url(#smog-turbulence-2) blur(12px)",
          }}
        />
        <div
          className="absolute inset-x-[-10%] bottom-0 animate-smog-3"
          style={{
            height: "120%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.08) 35%, transparent 55%)",
            filter: "url(#smog-turbulence-3) blur(18px)",
          }}
        />
      </div>
    </>
  );
}

// No public UI - just keeps sending heartbeats so the admin panel can see live listener counts.
export function PresenceTracker() {
  useListenerCount();
  return null;
}

const glass = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(12px) saturate(1.3)",
  WebkitBackdropFilter: "blur(12px) saturate(1.3)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow:
    "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
} as const;

function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-[12px]">
      <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
      <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
      <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
    </div>
  );
}

export function HeroWeather() {
  const { playlists, activePlaylistId, loadPlaylist } = usePlaylist();
  const [playlistOpen, setPlaylistOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [weatherForceClose, setWeatherForceClose] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);

  // Close playlist dropdown on outside click (desktop)
  useEffect(() => {
    if (!playlistOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlaylistOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [playlistOpen]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [sheetOpen]);

  return (
    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-[18] pointer-events-auto">
      {/* Mobile: playlist pill (replaces weather) */}
      {playlists.length > 0 && (
        <button
          onClick={() => playlists.length > 1 && setSheetOpen(true)}
          className="flex md:hidden items-center gap-2 rounded-full px-3.5 py-2 cursor-pointer transition-colors duration-200"
          style={glass}
        >
          <EqBars />
          <span className="text-[12px] font-medium text-white/85 max-w-[140px] truncate">
            {activePlaylist?.title ?? "Deluxe Mix"}
          </span>
          {playlists.length > 1 && (
            <ChevronDown size={14} className="text-white/50" />
          )}
        </button>
      )}

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden"
          onClick={() => setSheetOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 animate-fade-in" />

          {/* Sheet */}
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl py-4 animate-slide-up"
            style={{
              background: "rgba(20, 16, 12, 0.95)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderBottom: "none",
              maxHeight: "60vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center mb-3">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <p className="px-5 text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">
              Playlists
            </p>

            <div className="overflow-y-auto" style={{ maxHeight: "calc(60vh - 70px)" }}>
              {playlists.map((playlist) => {
                const isActive = playlist.id === activePlaylistId;
                return (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      loadPlaylist(playlist.id);
                      setSheetOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "text-white bg-white/8"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    }`}
                  >
                    {isActive && <EqBars />}
                    <span className={`text-[14px] truncate ${isActive ? "font-semibold" : "font-normal"}`}>
                      {playlist.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop: weather card */}
      <WeatherCard
        onToggle={(isOpen) => {
          if (isOpen) setPlaylistOpen(false);
        }}
        forceClose={weatherForceClose}
      />

      {/* Desktop playlist strip — below weather */}
      {playlists.length > 0 && (
        <div ref={dropdownRef} className="hidden md:block mt-2.5 relative">
          <div
            className="rounded-2xl px-5 flex items-center gap-2 cursor-pointer select-none"
            style={{
              minHeight: 48,
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(8px) saturate(1.2)",
              WebkitBackdropFilter: "blur(8px) saturate(1.2)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => {
              if (playlists.length > 1) {
                const next = !playlistOpen;
                setPlaylistOpen(next);
                if (next) {
                  setWeatherForceClose(true);
                  requestAnimationFrame(() => setWeatherForceClose(false));
                }
              }
            }}
          >
            <EqBars />
            <span className="text-[13px] font-medium text-white/80 truncate flex-1">
              {activePlaylist?.title ?? "Deluxe Mix"}
            </span>
            {playlists.length > 1 && (
              <ChevronDown
                size={16}
                className={`text-white/60 transition-transform duration-200 ${playlistOpen ? "rotate-180" : ""}`}
              />
            )}
          </div>

          {/* Dropdown */}
          {playlistOpen && playlists.length > 1 && (
            <div
              className="absolute top-full right-0 mt-1.5 w-full min-w-[220px] rounded-xl py-1.5 overflow-hidden animate-fade-in"
              style={{
                background: "rgba(20, 16, 12, 0.88)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {playlists.map((playlist) => {
                const isActive = playlist.id === activePlaylistId;
                return (
                  <button
                    key={playlist.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      loadPlaylist(playlist.id);
                      setPlaylistOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "text-white bg-white/8"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    }`}
                  >
                    {isActive && <EqBars />}
                    <span className={`text-[13px] truncate ${isActive ? "font-semibold" : "font-normal"}`}>
                      {playlist.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function HeroPlayer() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[10] pb-[20px] pointer-events-auto">
      <RadioPlayer />
    </div>
  );
}
