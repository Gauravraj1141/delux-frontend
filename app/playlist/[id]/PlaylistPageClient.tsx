"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import { usePlaylist } from "@/components/radio/PlaylistContext";
import { usePlayer } from "@/components/radio/PlayerContext";
import { getYouTubeThumbnail } from "@/components/radio/trackData";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaylistPageClient() {
  const params = useParams();
  const playlistId = Number(params.id);
  const { playlists, tracks, activePlaylistId, loadPlaylist } = usePlaylist();
  const { currentTrack, state, goToTrackIndex, togglePlay } = usePlayer();

  const playlist = playlists.find((p) => p.id === playlistId);

  // Load the playlist if it's not the active one
  useEffect(() => {
    if (playlistId && playlistId !== activePlaylistId && playlists.length > 0) {
      loadPlaylist(playlistId);
    }
  }, [playlistId, activePlaylistId, playlists.length, loadPlaylist]);

  const isActivePlaylist = activePlaylistId === playlistId;

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

        {/* Playlist header */}
        <div className="mb-8">
          <h1 className="text-[24px] md:text-[32px] font-bold text-white/90">
            {playlist?.title ?? "Playlist"}
          </h1>
          {playlist?.writer && (
            <p className="text-[13px] text-white/40 mt-1">
              Curated by {playlist.writer}
            </p>
          )}
          <p className="text-[12px] text-white/30 mt-2">
            {tracks.length} songs
          </p>
        </div>

        {/* Song list */}
        <div className="flex flex-col">
          {isActivePlaylist &&
            tracks.map((track, index) => {
              const isCurrentTrack = currentTrack?.videoId === track.videoId;
              const isPlaying = isCurrentTrack && state === "playing";

              return (
                <button
                  key={track.videoId}
                  onClick={() => {
                    if (isCurrentTrack) {
                      togglePlay();
                    } else {
                      goToTrackIndex(index);
                    }
                  }}
                  className={`group flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 rounded-xl transition-colors duration-150 cursor-pointer ${
                    isCurrentTrack
                      ? "bg-white/8"
                      : "hover:bg-white/4"
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

          {!isActivePlaylist && (
            <div className="py-12 text-center text-[13px] text-white/30">
              Loading playlist...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
