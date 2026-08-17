"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, ChevronRight } from "lucide-react";
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

export default function PlaylistIndexClient() {
  const { playlists, activePlaylistId, loadPlaylist, tracks: activeTracks } = usePlaylist();
  const { currentTrack, state, goToTrackIndex, togglePlay } = usePlayer();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [songs, setSongs] = useState<Track[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);

  const selectedPlaylist = playlists.find((p) => p.id === selectedId);

  const selectPlaylist = useCallback(async (id: number) => {
    setSelectedId(id);

    // If this is the currently active playlist, use tracks from context
    if (id === activePlaylistId) {
      setSongs(activeTracks);
      return;
    }

    // Otherwise fetch songs for this playlist
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

  // Update songs if the active playlist's tracks change and it's the selected one
  useEffect(() => {
    if (selectedId === activePlaylistId) {
      setSongs(activeTracks);
    }
  }, [activeTracks, selectedId, activePlaylistId]);

  const handlePlaySong = (index: number) => {
    // If the selected playlist isn't active, load it first
    if (selectedId !== activePlaylistId && selectedId !== null) {
      loadPlaylist(selectedId);
    }
    // Then play the track
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

        <h1 className="text-[24px] md:text-[32px] font-bold text-white/90 mb-8">
          Playlists
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Playlist list */}
          <div className="md:w-[280px] flex-shrink-0">
            <div className="flex flex-col gap-1.5">
              {playlists.map((playlist) => {
                const isSelected = playlist.id === selectedId;
                const isActive = playlist.id === activePlaylistId;

                return (
                  <button
                    key={playlist.id}
                    onClick={() => selectPlaylist(playlist.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-white/8"
                        : "hover:bg-white/4"
                    }`}
                  >
                    {isActive && (
                      <div className="flex items-end gap-[2px] h-[12px] flex-shrink-0">
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-1" />
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-2" />
                        <span className="w-[2.5px] bg-green-400 rounded-full animate-eq-3" />
                      </div>
                    )}
                    <span className={`text-[14px] truncate flex-1 ${
                      isSelected ? "text-white font-semibold" : "text-white/60"
                    }`}>
                      {playlist.title}
                    </span>
                    <ChevronRight size={14} className={`flex-shrink-0 ${isSelected ? "text-white/50" : "text-white/20"}`} />
                  </button>
                );
              })}

              {!playlists.length && (
                <p className="text-[13px] text-white/30 px-4 py-6">
                  Loading playlists...
                </p>
              )}
            </div>
          </div>

          {/* Songs list */}
          <div className="flex-1 min-w-0">
            {selectedId === null ? (
              <div className="rounded-2xl px-6 py-16 text-center" style={glass}>
                <p className="text-[14px] text-white/30">
                  Select a playlist to see its songs
                </p>
              </div>
            ) : loadingSongs ? (
              <div className="rounded-2xl px-6 py-16 text-center" style={glass}>
                <p className="text-[13px] text-white/30">Loading songs...</p>
              </div>
            ) : (
              <div>
                {selectedPlaylist && (
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-[16px] md:text-[18px] font-semibold text-white/80">
                        {selectedPlaylist.title}
                      </h2>
                      <p className="text-[11px] text-white/30 mt-0.5">
                        {songs.length} songs
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  {songs.map((track, index) => {
                    const isCurrentTrack =
                      selectedId === activePlaylistId &&
                      currentTrack?.videoId === track.videoId;
                    const isPlaying = isCurrentTrack && state === "playing";

                    return (
                      <button
                        key={track.videoId + index}
                        onClick={() => handlePlaySong(index)}
                        className={`group flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 rounded-xl transition-colors duration-150 cursor-pointer ${
                          isCurrentTrack ? "bg-white/8" : "hover:bg-white/4"
                        }`}
                      >
                        {/* Index / play indicator */}
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

                        {/* Artwork */}
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

                        {/* Track info */}
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

                        {/* Duration */}
                        <span className="text-[11px] text-white/25 tabular-nums flex-shrink-0">
                          {formatDuration(track.duration)}
                        </span>
                      </button>
                    );
                  })}

                  {!songs.length && (
                    <div className="py-12 text-center text-[13px] text-white/30">
                      No songs found in this playlist.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
