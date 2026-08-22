"use client";

import { Play, Pause, SkipBack, SkipForward, Share2, Loader2 } from "lucide-react";
import { usePlayer } from "./PlayerContext";
import { getYouTubeThumbnail } from "./trackData";
import { useShareCard } from "./useShareCard";

const glassStyle = {
  background: "rgba(30, 22, 16, 0.75)",
  backdropFilter: "blur(24px) saturate(1.3)",
  WebkitBackdropFilter: "blur(24px) saturate(1.3)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 -4px 32px rgba(0,0,0,0.35)",
} as const;

export default function MiniPlayer() {
  const {
    currentTrack,
    state,
    currentTime,
    duration,
    goToTrack,
    togglePlay,
  } = usePlayer();

  const { share, shareState } = useShareCard();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isPlaying = state === "playing";

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60]" style={glassStyle}>
      {/* Progress bar */}
      <div className="h-[2px] bg-white/5">
        <div
          className="h-full bg-white/40 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-[1040px] mx-auto px-4 py-2.5 flex items-center gap-3">
        {/* Artwork */}
        <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
          {currentTrack.artwork || currentTrack.videoId ? (
            <img
              src={currentTrack.artwork || getYouTubeThumbnail(currentTrack.videoId)}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${currentTrack.color}, rgba(255,255,255,0.15))`,
              }}
            />
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium truncate text-white/85">
            {currentTrack.title}
          </p>
          <p className="text-[11px] truncate text-white/40">
            {currentTrack.artist}
          </p>
        </div>

        {/* Share */}
        <button
          onClick={() => share(currentTrack)}
          disabled={shareState !== "idle"}
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer flex-shrink-0"
          aria-label="Share song"
        >
          {shareState === "idle" ? (
            <Share2 size={16} />
          ) : (
            <Loader2 size={16} className="animate-spin" />
          )}
        </button>

        {/* Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => goToTrack(-1)}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous"
          >
            <SkipBack size={16} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            onClick={() => goToTrack(1)}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next"
          >
            <SkipForward size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
