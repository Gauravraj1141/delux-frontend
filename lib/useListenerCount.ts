"use client";

import { useState, useEffect, useRef } from "react";

export function useListenerCount() {
  const [count, setCount] = useState(9500);
  const countRef = useRef(9500);

  useEffect(() => {
    const update = () => {
      const current = countRef.current;
      // Small random drift: -50 to +60 from current value
      const drift = Math.floor(Math.random() * 111) - 50;
      let next = current + drift;
      // Clamp between 7000 and 12000
      next = Math.max(7000, Math.min(12000, next));
      countRef.current = next;
      setCount(next);
    };

    const scheduleNext = () => {
      // Update every 15–30 seconds
      const delay = 15000 + Math.random() * 15000;
      return setTimeout(() => {
        update();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();
    return () => clearTimeout(timerId);
  }, []);

  return count;
}
