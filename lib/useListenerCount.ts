"use client";

import { useState, useEffect, useRef } from "react";

const API_BASE = "https://api.deluxesalonsongs.com";

export function useListenerCount() {
  const [count, setCount] = useState<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const beat = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/presence/heartbeat`, {
          method: "POST",
          credentials: "include",
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return;
        const data: { count: number } = await res.json();
        if (mountedRef.current) setCount(data.count);
      } catch {
        // Network hiccup - keep showing the last known count until the next beat succeeds.
      }
    };

    const scheduleNext = () => {
      // Heartbeat every 20-30s, comfortably under the backend's 10/minute rate limit.
      const delay = 20000 + Math.random() * 10000;
      return setTimeout(() => {
        beat();
        timerId = scheduleNext();
      }, delay);
    };

    beat();
    let timerId = scheduleNext();

    return () => {
      mountedRef.current = false;
      clearTimeout(timerId);
    };
  }, []);

  return count;
}
