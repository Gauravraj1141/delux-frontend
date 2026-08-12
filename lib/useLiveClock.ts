"use client";

import { useState, useEffect } from "react";

export function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return { time: "--:-- --", date: "" };

  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hours = ist.getHours();
  const h12 = hours % 12 || 12;
  const ampm = hours < 12 ? "am" : "pm";
  const mins = ist.getMinutes().toString().padStart(2, "0");

  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const dateStr = `${days[ist.getDay()]}, ${ist.getDate()} ${months[ist.getMonth()]} · IST`;

  return { time: `${h12}:${mins}  ${ampm}`, date: dateStr };
}
