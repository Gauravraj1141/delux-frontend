"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Play, Pause, ChevronDown } from "lucide-react";
import { usePlaylist } from "@/components/radio/PlaylistContext";
import { usePlayer } from "@/components/radio/PlayerContext";
import { getYouTubeThumbnail } from "@/components/radio/trackData";
import type { Track } from "@/components/radio/trackData";

const API_BASE = "https://api.deluxesalonsongs.com";

const glass = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
} as const;

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SongRow({
  track,
  index,
  isCurrentTrack,
  isPlaying,
  onClick,
}: {
  track: Track;
  index: number;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 rounded-xl transition-colors duration-150 cursor-pointer ${
        isCurrentTrack ? "bg-white/8" : "hover:bg-white/4"
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
        {isCurrentTrack ? (
          isPlaying ? (
            <div className="flex items-end gap-[2px] h-[14px]">
              <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
              <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
              <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
            </div>
          ) : (
            <Pause size={16} className="text-white/70" />
          )
        ) : (
          <>
            <span className="text-[12px] text-white/25 tabular-nums group-hover:hidden">
              {index + 1}
            </span>
            <Play size={14} className="text-white/50 hidden group-hover:block ml-0.5" />
          </>
        )}
      </div>

      <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
        {track.artwork || track.videoId ? (
          <img
            src={track.artwork || getYouTubeThumbnail(track.videoId)}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${track.color}, rgba(255,255,255,0.15))`,
            }}
          />
        )}
      </div>

      <div className="min-w-0 flex-1 text-left">
        <p className={`text-[13px] md:text-[14px] font-medium truncate ${
          isCurrentTrack ? "text-green-400" : "text-white/80"
        }`}>
          {track.title}
        </p>
        <p className="text-[11px] md:text-[12px] truncate text-white/40">
          {track.artist}
        </p>
      </div>

      <span className="text-[11px] text-white/25 tabular-nums flex-shrink-0">
        {formatDuration(track.duration)}
      </span>
    </button>
  );
}

export default function PlaylistIndexClient() {
  const { playlists, activePlaylistId, loadPlaylist, tracks: activeTracks } = usePlaylist();
  const { currentTrack, state, goToTrackIndex, togglePlay } = usePlayer();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [songs, setSongs] = useState<Track[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedPlaylist = playlists.find((p) => p.id === selectedId);

  // Close mobile dropdown on outside click
  useEffect(() => {
    if (!mobileDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileDropdownOpen]);

  const selectPlaylist = useCallback(async (id: number) => {
    setSelectedId(id);
    setMobileDropdownOpen(false);

    if (id === activePlaylistId) {
      setSongs(activeTracks);
      return;
    }

    setLoadingSongs(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/playlists/${id}/songs`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error("Failed");
      const data: Track[] = await res.json();
      setSongs(data);
    } catch {
      setSongs([]);
    }
    setLoadingSongs(false);
  }, [activePlaylistId, activeTracks]);

  useEffect(() => {
    if (selectedId === activePlaylistId) {
      setSongs(activeTracks);
    }
  }, [activeTracks, selectedId, activePlaylistId]);

  const handlePlaySong = (index: number) => {
    if (selectedId !== activePlaylistId && selectedId !== null) {
      loadPlaylist(selectedId);
    }
    if (selectedId === activePlaylistId) {
      if (currentTrack?.videoId === songs[index]?.videoId) {
        togglePlay();
      } else {
        goToTrackIndex(index);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="max-w-[1040px] mx-auto px-5 md:px-8 pt-24 md:pt-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors duration-200 mb-8"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back to radio
        </Link>

        <h1 className="text-[24px] md:text-[32px] font-bold text-white/90 mb-6 md:mb-8">
          Playlists
        </h1>

        {/* Mobile: playlist dropdown */}
        <div className="md:hidden mb-6" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setMobileDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 rounded-xl px-4 py-3 cursor-pointer"
              style={glass}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {selectedId === activePlaylistId && selectedId !== null && (
                  <div className="flex items-end gap-[2px] h-[12px] flex-shrink-0">
                    <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
                    <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
                    <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
                  </div>
                )}
                <span className="text-[14px] font-medium text-white/80 truncate">
                  {selectedPlaylist?.title ?? "Select a playlist"}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/40 flex-shrink-0 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDropdownOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-1.5 rounded-xl py-1.5 overflow-hidden z-20 animate-fade-in"
                style={{
                  background: "rgba(20, 16, 12, 0.92)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {playlists.map((playlist) => {
                  const isActive = playlist.id === activePlaylistId;
                  const isSelected = playlist.id === selectedId;
                  return (
                    <button
                      key={playlist.id}
                      onClick={() => selectPlaylist(playlist.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors duration-150 cursor-pointer ${
                        isSelected ? "bg-white/8" : "hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <div className="flex items-end gap-[2px] h-[12px] flex-shrink-0">
                          <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
                          <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
                          <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
                        </div>
                      )}
                      <span className={`text-[13px] truncate ${isSelected ? "text-white font-semibold" : "text-white/60"}`}>
                        {playlist.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop: sidebar + songs */}
        <div className="hidden md:flex gap-6" style={{ height: "calc(100vh - 200px)" }}>
          {/* Sticky sidebar */}
          <div className="w-[260px] flex-shrink-0 overflow-y-auto rounded-2xl p-2" style={glass}>
            <div className="flex flex-col gap-0.5">
              {playlists.map((playlist) => {
                const isSelected = playlist.id === selectedId;
                const isActive = playlist.id === activePlaylistId;

                return (
                  <button
                    key={playlist.id}
                    onClick={() => selectPlaylist(playlist.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                      isSelected ? "bg-white/8" : "hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <div className="flex items-end gap-[2px] h-[12px] flex-shrink-0">
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
                      </div>
                    )}
                    <span className={`text-[13px] truncate flex-1 ${
                      isSelected ? "text-white font-semibold" : "text-white/55"
                    }`}>
                      {playlist.title}
                    </span>
                  </button>
                );
              })}

              {!playlists.length && (
                <p className="text-[13px] text-white/30 px-4 py-6">Loading playlists...</p>
              )}
            </div>
          </div>

          {/* Scrollable songs area */}
          <div className="flex-1 min-w-0 overflow-y-auto">
            {selectedId === null ? (
              <div className="rounded-2xl px-6 py-16 text-center" style={glass}>
                <p className="text-[14px] text-white/30">Select a playlist to see its songs</p>
              </div>
            ) : loadingSongs ? (
              <div className="rounded-2xl px-6 py-16 text-center" style={glass}>
                <p className="text-[13px] text-white/30">Loading songs...</p>
              </div>
            ) : (
              <div>
                {selectedPlaylist && (
                  <div className="mb-4">
                    <h2 className="text-[18px] font-semibold text-white/80">{selectedPlaylist.title}</h2>
                    <p className="text-[11px] text-white/30 mt-0.5">{songs.length} songs</p>
                  </div>
                )}
                <div className="flex flex-col">
                  {songs.map((track, index) => {
                    const isCurrentTrack = selectedId === activePlaylistId && currentTrack?.videoId === track.videoId;
                    const isPlaying = isCurrentTrack && state === "playing";
                    return (
                      <SongRow
                        key={track.videoId + index}
                        track={track}
                        index={index}
                        isCurrentTrack={isCurrentTrack}
                        isPlaying={isPlaying}
                        onClick={() => handlePlaySong(index)}
                      />
                    );
                  })}
                  {!songs.length && (
                    <div className="py-12 text-center text-[13px] text-white/30">No songs found in this playlist.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: songs list */}
        <div className="md:hidden">
          {selectedId === null ? (
            <div className="rounded-2xl px-6 py-12 text-center" style={glass}>
              <p className="text-[13px] text-white/30">Select a playlist above</p>
            </div>
          ) : loadingSongs ? (
            <div className="rounded-2xl px-6 py-12 text-center" style={glass}>
              <p className="text-[13px] text-white/30">Loading songs...</p>
            </div>
          ) : (
            <div>
              {selectedPlaylist && (
                <div className="mb-3">
                  <p className="text-[11px] text-white/30">{songs.length} songs</p>
                </div>
              )}
              <div className="flex flex-col">
                {songs.map((track, index) => {
                  const isCurrentTrack = selectedId === activePlaylistId && currentTrack?.videoId === track.videoId;
                  const isPlaying = isCurrentTrack && state === "playing";
                  return (
                    <SongRow
                      key={track.videoId + index}
                      track={track}
                      index={index}
                      isCurrentTrack={isCurrentTrack}
                      isPlaying={isPlaying}
                      onClick={() => handlePlaySong(index)}
                    />
                  );
                })}
                {!songs.length && (
                  <div className="py-12 text-center text-[13px] text-white/30">No songs found in this playlist.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
