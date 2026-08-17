"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import RadioPlayer from "@/components/radio/RadioPlayer";
import { useListenerCount } from "@/lib/useListenerCount";

const WeatherCard = dynamic(() => import("@/components/WeatherCard"), {
  ssr: false,
});

export function SmogEffects() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Top smog turbulent layers — desktop only */}
      <div
        className="absolute inset-x-0 top-0 z-[2] pointer-events-none"
        style={{ height: "55%" }}
      >
        <div
          className="absolute inset-x-[-10%] top-0 animate-smog-2"
          style={{
            height: "115%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.04) 60%, transparent 80%)",
            filter: "url(#smog-turbulence-1) blur(10px)",
          }}
        />
        <div
          className="absolute inset-x-[-15%] top-0 animate-smog-3"
          style={{
            height: "120%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.05) 45%, transparent 65%)",
            filter: "url(#smog-turbulence-3) blur(16px)",
          }}
        />
      </div>

      {/* SVG filters */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <filter id="smog-turbulence-1" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves={3} seed={2} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={80} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.025" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={100} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-3" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves={3} seed={13} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={120} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Rising smog turbulent layers — desktop only */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
        style={{ height: "70%" }}
      >
        <div
          className="absolute inset-x-[-10%] bottom-0 animate-smog-1"
          style={{
            height: "110%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 55%, transparent 75%)",
            filter: "url(#smog-turbulence-1) blur(8px)",
          }}
        />
        <div
          className="absolute inset-x-[-15%] bottom-0 animate-smog-2"
          style={{
            height: "115%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.05) 55%, transparent 70%)",
            filter: "url(#smog-turbulence-2) blur(12px)",
          }}
        />
        <div
          className="absolute inset-x-[-10%] bottom-0 animate-smog-3"
          style={{
            height: "120%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.08) 35%, transparent 55%)",
            filter: "url(#smog-turbulence-3) blur(18px)",
          }}
        />
      </div>
    </>
  );
}

export function ListenerCount() {
  const listenerCount = useListenerCount();

  if (listenerCount === null) return null;

  return (
    <div
      className="mt-5 md:mt-6 flex items-center gap-2 rounded-full px-4 py-2"
      style={{
        background: "rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(8px) saturate(1.2)",
        WebkitBackdropFilter: "blur(8px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse-dot" />
      <span className="text-[12px] md:text-[13px] text-white/80 font-semibold">
        {listenerCount.toLocaleString()} listening
      </span>
    </div>
  );
}

export function HeroWeather() {
  return (
    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-[8] pointer-events-auto">
      <WeatherCard />
    </div>
  );
}

export function HeroPlayer() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[10] pb-[20px] pointer-events-auto">
      <RadioPlayer />
    </div>
  );
}
