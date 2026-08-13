"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import TrackCarousel from "./TrackCarousel";
import PlayerControls from "./PlayerControls";
import { wrapIndex } from "./trackData";
import { useYouTubePlayer } from "./useYouTubePlayer";
import { usePlaylistLoader } from "./usePlaylistLoader";

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

export default function RadioPlayer() {
  const { tracks } = usePlaylistLoader();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<PlayerState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const stateRef = useRef<PlayerState>("idle");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const safeIndex = wrapIndex(currentIndex, tracks.length);
  const currentTrack = tracks[safeIndex];
  const len = tracks.length;
  const visibleTracks = [
    tracks[wrapIndex(safeIndex - 2, len)],
    tracks[wrapIndex(safeIndex - 1, len)],
    tracks[wrapIndex(safeIndex, len)],
    tracks[wrapIndex(safeIndex + 1, len)],
    tracks[wrapIndex(safeIndex + 2, len)],
  ];

  const statusText: Record<PlayerState, string> = {
    idle: "Tuning in…",
    loading: "Loading…",
    playing: "Now playing",
    paused: "Paused",
    error: "Unable to play",
  };

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const goToTrackRef = useRef<(offset: number) => void>(() => {});
  const skippedTrackRef = useRef<string | null>(null);

  const yt = useYouTubePlayer("yt-player", {
    onStateChange: (ytState) => {
      if (ytState === 1) {
        stateRef.current = "playing";
        setState("playing");
      } else if (ytState === 2) {
        stateRef.current = "paused";
        setState("paused");
      } else if (ytState === 3) {
        stateRef.current = "loading";
        setState("loading");
      } else if (ytState === -1) {
        if (stateRef.current === "loading") {
          setState("loading");
        }
      }
    },
    onTimeUpdate: (time, dur) => {
      setCurrentTime(time);
      if (dur > 0) setDuration(dur);
    },
    onEnded: () => {
      goToTrackRef.current(1);
    },
    onError: () => {
      // Save the name of the skipped track for the toast
      const idx = skippedTrackRef.current
        ? undefined
        : undefined;
      const currentName = tracks[currentIndex]?.title || "Track";
      skippedTrackRef.current = currentName;
      showToast(`"${currentName}" is unavailable, skipping…`);
      setTimeout(() => goToTrackRef.current(1), 500);
    },
  });

  const goToTrack = useCallback(
    (offset: number) => {
      const nextIndex = wrapIndex(currentIndex + offset, tracks.length);
      setCurrentIndex(nextIndex);
      setCurrentTime(0);
      setDuration(tracks[nextIndex].duration);
      setState("loading");
      stateRef.current = "loading";

      yt.playVideo(tracks[nextIndex].videoId);
    },
    [currentIndex, yt],
  );

  goToTrackRef.current = goToTrack;

  const togglePlay = useCallback(() => {
    if (stateRef.current === "playing") {
      yt.pause();
    } else if (stateRef.current === "paused") {
      yt.play();
      setState("loading");
      stateRef.current = "loading";
    } else {
      yt.playVideo(currentTrack.videoId);
      setState("loading");
      stateRef.current = "loading";
    }
  }, [currentTrack, yt]);

  const toggleMute = useCallback(() => {
    if (muted) {
      yt.unMute();
      setMuted(false);
    } else {
      yt.mute();
      setMuted(true);
    }
  }, [muted, yt]);

  const handleSeek = useCallback(
    (time: number) => {
      yt.seekTo(time);
      setCurrentTime(time);
    },
    [yt],
  );

  const handleVolumeChange = useCallback(
    (vol: number) => {
      yt.setVolume(vol);
      setVolume(vol);
      if (muted) {
        yt.unMute();
        setMuted(false);
      }
    },
    [muted, yt],
  );

  return (
    <section className="w-full py-4">

      <div className="max-w-[900px] mx-auto px-4 md:px-6">
        {/* Track carousel */}
        <TrackCarousel
          visibleTracks={visibleTracks}
          onSelectTrack={(offset) => goToTrack(offset)}
          currentTrack={currentTrack}
        />

        {/* Glass control bar */}
        <div className="mt-6 md:mt-8 max-w-[560px] mx-auto">
          <PlayerControls
            track={currentTrack}
            isPlaying={state === "playing"}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            muted={muted}
            onTogglePlay={togglePlay}
            onNext={() => goToTrack(1)}
            onPrevious={() => goToTrack(-1)}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
            status={statusText[state]}
          />
        </div>

      </div>

      {/* Skip toast */}
      <div
        className="fixed left-4 z-[100] transition-all duration-300 ease-out"
        style={{
          bottom: toast ? "24px" : "-60px",
          opacity: toast ? 1 : 0,
          pointerEvents: toast ? "auto" : "none",
        }}
      >
        <div
          className="px-4 py-2.5 rounded-xl text-[12px] md:text-[13px] text-white/80 whitespace-nowrap"
          style={{
            background: "rgba(30, 22, 16, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {toast}
        </div>
      </div>

      {/* YouTube player — visible to browser but invisible to user */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "320px",
          height: "180px",
          opacity: 0.001,
          pointerEvents: "none",
          zIndex: -1,
          overflow: "hidden",
          clipPath: "inset(0)",
        }}
      >
        <div id="yt-player" />
      </div>
    </section>
  );
}
