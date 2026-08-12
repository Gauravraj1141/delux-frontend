"use client";

import { useState, useEffect, useRef } from "react";

export function useListenerCount() {
  const [count, setCount] = useState(953);
  const countRef = useRef(953);

  useEffect(() => {
    const update = () => {
      const current = countRef.current;
      // Small random drift: -15 to +20 from current value
      const drift = Math.floor(Math.random() * 36) - 15;
      let next = current + drift;
      // Clamp between 700 and 1200
      next = Math.max(700, Math.min(1200, next));
      countRef.current = next;
      setCount(next);
    };

    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 7000;
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
