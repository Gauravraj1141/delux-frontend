import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Track } from "./trackData";
import { getYouTubeThumbnail } from "./trackData";

interface PlayerControlsProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  status: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerControls({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  muted,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  status,
}: PlayerControlsProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayDuration = duration > 0 ? duration : track.duration;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(30, 22, 16, 0.55)",
        backdropFilter: "blur(24px) saturate(1.3)",
        WebkitBackdropFilter: "blur(24px) saturate(1.3)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="px-4 md:px-5 py-3 md:py-3.5">
        {/* Controls row */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Transport controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevious}
              className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors duration-200"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={22} fill="currentColor" />
              ) : (
                <Play size={22} fill="currentColor" className="ml-0.5" />
              )}
            </button>
            <button
              onClick={onNext}
              className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors duration-200"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Compact current track info */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* Thumbnail */}
            <div className="w-9 h-9 rounded-md flex-shrink-0 overflow-hidden">
              {track.artwork || track.videoId ? (
                <img
                  src={track.artwork || getYouTubeThumbnail(track.videoId)}
                  alt=""
                  className="w-full h-full object-cover"
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
            <div className="min-w-0 flex-1">
              <p className="text-[12px] md:text-[13px] font-medium truncate text-white/85">
                {track.title}
              </p>
              <p className="text-[10px] md:text-[11px] truncate text-white/40">
                {status === "error" ? "Unable to play" : track.artist}
              </p>
            </div>
          </div>

          {/* Volume (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="text-white/30 hover:text-white/60 transition-colors duration-200"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="text-[10px] text-white/25 tabular-nums w-8 text-right flex-shrink-0">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-[3px] bg-white/8 rounded-full overflow-hidden cursor-pointer relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              onSeek(pct * (duration || displayDuration));
            }}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full bg-white/35 group-hover:bg-white/50 rounded-full transition-colors duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-white/25 tabular-nums w-8 flex-shrink-0">
            {formatTime(displayDuration)}
          </span>
        </div>
      </div>
    </div>
  );
}
