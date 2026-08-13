import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
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
  loop: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onShuffle: () => void;
  onToggleLoop: () => void;
  status: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ProgressBar({
  progress,
  onSeek,
  duration,
  displayDuration,
  className = "",
}: {
  progress: number;
  onSeek: (time: number) => void;
  duration: number;
  displayDuration: number;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/5 cursor-pointer group ${className}`}
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
        className="h-full bg-white/40 group-hover:bg-white/60 transition-colors duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function PlayerControls({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  muted,
  loop,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onShuffle,
  onToggleLoop,
}: PlayerControlsProps) {
  const [volumeOpen, setVolumeOpen] = useState(false);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayDuration = duration > 0 ? duration : track.duration;
  const remaining = displayDuration - currentTime;

  const glassStyle = {
    background: "rgba(30, 22, 16, 0.55)",
    backdropFilter: "blur(24px) saturate(1.3)",
    WebkitBackdropFilter: "blur(24px) saturate(1.3)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
  };

  return (
    <>
      {/* ===== MOBILE LAYOUT (<560px) ===== */}
      <div className="block sm:hidden rounded-2xl overflow-hidden" style={glassStyle}>
        <div className="px-5 pt-5 pb-4">
          {/* Song title + speaker with inline volume */}
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1 mr-3">
              <p className="text-[18px] font-semibold text-white/90 truncate">
                {track.title}
              </p>
              <p className="text-[13px] text-white/45 truncate mt-0.5">
                {track.artist}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-shrink-0">
              {volumeOpen && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                  aria-label="Volume"
                />
              )}
              <button
                onClick={() => setVolumeOpen((v) => !v)}
                className="cursor-pointer text-white transition-colors duration-200"
                aria-label={volumeOpen ? "Close volume" : "Open volume"}
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          {/* Progress bar + times */}
          <div className="mt-4">
            <ProgressBar
              progress={progress}
              onSeek={onSeek}
              duration={duration}
              displayDuration={displayDuration}
              className="h-[3px] rounded-full"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-white/30 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="text-[10px] text-white/30 tabular-nums">
                -{formatTime(remaining > 0 ? remaining : 0)}
              </span>
            </div>
          </div>

          {/* Transport controls with shuffle & loop on sides */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={onShuffle}
              className="w-9 h-9 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
              aria-label="Shuffle"
            >
              <Shuffle size={18} />
            </button>
            <div className="flex items-center gap-6">
              <button
                onClick={onPrevious}
                className="w-10 h-10 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                aria-label="Previous track"
              >
                <SkipBack size={22} fill="currentColor" />
              </button>
              <button
                onClick={onTogglePlay}
                className="w-14 h-14 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={32} fill="currentColor" />
                ) : (
                  <Play size={32} fill="currentColor" className="ml-1" />
                )}
              </button>
              <button
                onClick={onNext}
                className="w-10 h-10 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                aria-label="Next track"
              >
                <SkipForward size={22} fill="currentColor" />
              </button>
            </div>
            <button
              onClick={onToggleLoop}
              className={`w-9 h-9 flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                loop ? "text-white" : "text-white/40"
              }`}
              aria-label={loop ? "Disable loop" : "Enable loop"}
            >
              <Repeat size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (>=560px) ===== */}
      <div className="hidden sm:block rounded-2xl overflow-visible" style={glassStyle}>
        <div className="px-4 md:px-5 py-3 md:py-3.5">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Transport controls */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={onPrevious}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 cursor-pointer"
                aria-label="Previous track"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button
                onClick={onTogglePlay}
                className="w-9 h-9 flex items-center justify-center text-white hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>
              <button
                onClick={onNext}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 cursor-pointer"
                aria-label="Next track"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>

            {/* Track info card with progress as bottom border */}
            <div
              className="flex-1 min-w-0 rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden">
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
                    {track.artist}
                  </p>
                </div>
                <span className="text-[10px] text-white/30 tabular-nums flex-shrink-0">
                  {formatTime(currentTime)} / {formatTime(displayDuration)}
                </span>
              </div>
              <ProgressBar
                progress={progress}
                onSeek={onSeek}
                duration={duration}
                displayDuration={displayDuration}
                className="h-[2.5px]"
              />
            </div>

            {/* Right actions — speaker click toggles between loop/shuffle and volume slider */}
            <div className="flex items-center gap-0.5 transition-all duration-300">
              {volumeOpen ? (
                <>
                  <button
                    onClick={() => setVolumeOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 cursor-pointer"
                    aria-label="Close volume"
                  >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-20"
                    aria-label="Volume"
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={onToggleLoop}
                    className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                      loop ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                    aria-label={loop ? "Disable loop" : "Enable loop"}
                  >
                    <Repeat size={15} />
                  </button>
                  <button
                    onClick={onShuffle}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 cursor-pointer"
                    aria-label="Shuffle"
                  >
                    <Shuffle size={15} />
                  </button>
                  <button
                    onClick={() => setVolumeOpen(true)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 cursor-pointer"
                    aria-label="Open volume"
                  >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
