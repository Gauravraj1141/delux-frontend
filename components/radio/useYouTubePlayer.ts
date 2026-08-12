"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Extend Window to include YouTube IFrame API types
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
    _ytPlayerReady: boolean;
    _ytPlayerCallbacks: (() => void)[];
  }
}

// Minimal YT types
declare namespace YT {
  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: Record<string, unknown>;
    events?: {
      onReady?: (event: { target: Player }) => void;
      onStateChange?: (event: { data: number; target: Player }) => void;
      onError?: (event: { data: number }) => void;
    };
  }

  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    loadVideoById(videoId: string): void;
    cueVideoById(videoId: string): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): number;
    destroy(): void;
  }
}

interface UseYouTubePlayerOptions {
  onStateChange?: (state: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: () => void;
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    if (!window._ytPlayerCallbacks) {
      window._ytPlayerCallbacks = [];
    }
    window._ytPlayerCallbacks.push(() => resolve());

    if (window._ytPlayerReady) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (!existingScript) {
      window.onYouTubeIframeAPIReady = () => {
        window._ytPlayerReady = true;
        window._ytPlayerCallbacks?.forEach((cb) => cb());
        window._ytPlayerCallbacks = [];
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}

export function useYouTubePlayer(
  containerId: string,
  options: UseYouTubePlayerOptions = {},
) {
  const playerRef = useRef<YT.Player | null>(null);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  function startTimePolling() {
    stopTimePolling();
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          optionsRef.current.onTimeUpdate?.(currentTime, duration);
        } catch {
          // Player might not be ready yet
        }
      }
    }, 250);
  }

  function stopTimePolling() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    let destroyed = false;

    loadYouTubeAPI().then(() => {
      if (destroyed || playerRef.current) return;

      const container = document.getElementById(containerId);
      if (!container) return;

      playerRef.current = new window.YT.Player(containerId, {
        height: "180",
        width: "320",
        playerVars: {
          enablejsapi: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (!destroyed) setReady(true);
          },
          onStateChange: (event) => {
            if (destroyed) return;
            const state = event.data;
            optionsRef.current.onStateChange?.(state);

            if (state === 0) {
              optionsRef.current.onEnded?.();
            }

            if (state === 1) {
              startTimePolling();
            } else {
              stopTimePolling();
            }
          },
          onError: (event) => {
            if (destroyed) return;
            console.warn("YouTube player error:", event.data);
            optionsRef.current.onError?.();
          },
        },
      });
    });

    return () => {
      destroyed = true;
      stopTimePolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  const playVideo = useCallback((videoId: string) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    }
  }, []);

  const cueVideo = useCallback((videoId: string) => {
    if (playerRef.current) {
      playerRef.current.cueVideoById(videoId);
    }
  }, []);

  const play = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(Math.round(vol * 100));
    }
  }, []);

  const mute = useCallback(() => {
    playerRef.current?.mute();
  }, []);

  const unMute = useCallback(() => {
    playerRef.current?.unMute();
  }, []);

  return {
    ready,
    playVideo,
    cueVideo,
    play,
    pause,
    seekTo,
    setVolume,
    mute,
    unMute,
  };
}
