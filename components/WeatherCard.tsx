"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface WeatherData {
  location: string;
  temp_c: number;
  feelslike_c: number;
  condition: string;
  condition_icon: string;
  wind_kph: number;
  humidity: number;
  uv: number;
  chance_of_rain: number;
  localtime: string;
}

const glass = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(8px) saturate(1.2)",
  WebkitBackdropFilter: "blur(8px) saturate(1.2)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow:
    "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
} as const;

export default function WeatherCard({
  onToggle,
  forceClose,
}: {
  onToggle?: (isOpen: boolean) => void;
  forceClose?: boolean;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [now, setNow] = useState(new Date());
  const [open, setOpen] = useState(false);
  // Allow parent to force close
  useEffect(() => {
    if (forceClose && open) setOpen(false);
  }, [forceClose, open]);

  useEffect(() => {
    function fetchWeather(lat: number, lon: number) {
      fetch(`/api/weather?lat=${lat}&lon=${lon}`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) setWeather(d);
        })
        .catch(() => {});
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => {},
        { timeout: 10000 },
      );
    }

    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!weather) return null;

  const dayNum = now.getDate();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="hidden md:flex flex-col gap-2.5 md:w-[290px]">
      {/* Desktop: Location pill */}
      <div
        className="hidden md:flex rounded-2xl px-5 items-center gap-2 cursor-pointer select-none"
        style={{ ...glass, minHeight: 48 }}
        onClick={() => {
          const next = !open;
          setOpen(next);
          onToggle?.(next);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="text-[13px] font-medium text-white/80 truncate">
          {weather.location}
        </span>

        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <span className="text-[18px] font-bold text-white/90">
            {weather.temp_c}°
          </span>
          {open ? (
            <ChevronUp size={16} className="text-white/60" />
          ) : (
            <ChevronDown size={16} className="text-white/60" />
          )}
        </div>
      </div>

      {/* Collapsible content — desktop only */}
      <div
        className="hidden md:grid overflow-hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 300ms ease, opacity 200ms ease",
        }}
      >
        <div className="min-h-0 overflow-hidden flex flex-col gap-2.5">
        {/* Temperature card */}
        <div
          className="rounded-2xl px-5 py-4 flex items-center justify-between"
          style={glass}
        >
          <div>
            <div className="flex items-start">
              <span className="text-[42px] font-bold text-white/90 leading-none">
                {weather.temp_c}
              </span>
              <span className="text-[16px] text-white/50 mt-1 ml-1">°C</span>
            </div>
            <p className="text-[13px] text-white/60 mt-1">
              {weather.condition}
            </p>
          </div>
          <img
            src={weather.condition_icon}
            alt={weather.condition}
            width={64}
            height={64}
            className="drop-shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Bottom row: date + time */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Date card */}
          <div
            className="rounded-2xl px-4 py-3.5 flex flex-col"
            style={glass}
          >
            <span className="text-[32px] font-bold text-white/85 leading-none">
              {dayNum}
            </span>
            <span className="text-[12px] text-white/60 mt-1">{dayName}</span>
            <span className="text-[10px] font-semibold text-white/35 mt-1.5">
              🌧 {weather.chance_of_rain}% precipitation
            </span>
          </div>

          {/* Time card */}
          <div
            className="rounded-2xl px-4 py-3.5 flex items-center justify-center"
            style={glass}
          >
            <span className="text-[22px] font-semibold text-white/85 leading-none">
              {timeStr}
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
