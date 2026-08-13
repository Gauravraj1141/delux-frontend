"use client";

import RadioPlayer from "@/components/radio/RadioPlayer";
import { useLiveClock } from "@/lib/useLiveClock";
import { useListenerCount } from "@/lib/useListenerCount";

export default function Hero() {
  const { time, date } = useLiveClock();
  const listenerCount = useListenerCount();
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Background image */}
      <img
        src="/images/saloon-hero.webp"
        alt="Illustration of an Indian street-side barbershop — a barber cutting hair while neighbours sit outside next to a chai stall"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Subtle top gradient for header readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-[1]" />

      {/* Top smog effect — lighter version, descending from top */}
      <div
        className="absolute inset-x-0 top-0 z-[2] pointer-events-none"
        style={{ height: "55%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 12%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.04) 70%, transparent 95%)",
          }}
        />
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
      {/* Bottom gradient for transition to content */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/50 to-transparent z-[1]" />

      {/* SVG filters for organic turbulent smog edges */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <filter id="smog-turbulence-1" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves={4}
              seed={2}
              result="noise"
            >
              <animate attributeName="baseFrequency" values="0.015 0.03;0.02 0.04;0.015 0.03" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={80} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-2" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.025"
              numOctaves={3}
              seed={7}
              result="noise"
            >
              <animate attributeName="baseFrequency" values="0.01 0.025;0.018 0.035;0.01 0.025" dur="14s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={100} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="smog-turbulence-3" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.02"
              numOctaves={5}
              seed={13}
              result="noise"
            >
              <animate attributeName="baseFrequency" values="0.008 0.02;0.012 0.028;0.008 0.02" dur="18s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={120} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Rising smog effect — starts from the very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
        style={{ height: "70%" }}
      >
        {/* Base dense smog — heavy at bottom, fading upward */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.04) 80%, transparent 95%)",
          }}
        />

        {/* Turbulent wispy layer 1 — thick, slow */}
        <div
          className="absolute inset-x-[-10%] bottom-0 animate-smog-1"
          style={{
            height: "110%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 55%, transparent 75%)",
            filter: "url(#smog-turbulence-1) blur(8px)",
          }}
        />

        {/* Turbulent wispy layer 2 — medium density, medium speed */}
        <div
          className="absolute inset-x-[-15%] bottom-0 animate-smog-2"
          style={{
            height: "115%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.05) 55%, transparent 70%)",
            filter: "url(#smog-turbulence-2) blur(12px)",
          }}
        />

        {/* Turbulent wispy layer 3 — lightest, fastest drift */}
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

      {/* Title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-[14vh] sm:pt-[15vh] md:pt-[12vh] px-5 z-[3] pointer-events-none">
        <h1
          className="text-[4.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-bold text-white text-center leading-[1.15]"
          style={{
            fontFamily: "var(--font-hindi), sans-serif",
            textShadow:
              "0 2px 30px rgba(0,0,0,0.5), 0 4px 60px rgba(0,0,0,0.3), 0 0 100px rgba(0,0,0,0.2)",
          }}
        >
          डीलक्स
          <br />
          सैलून सॉन्ग्स
        </h1>
        {/* Clock + Listener count (below md only) */}
        <div className="flex md:hidden flex-col items-center gap-0.5 mt-6">
          <p className="text-[22px] font-bold text-white/80 tracking-wide tabular-nums leading-tight">
            {time}
          </p>
          <p className="text-[9px] text-white/60 font-medium tracking-[0.2em] uppercase leading-tight mt-1.5">
            {date}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-[12px] text-white font-semibold">
              {listenerCount} listening
            </span>
          </div>
        </div>
      </div>

      {/* Radio player pinned to bottom of hero */}
      <div className="absolute inset-x-0 bottom-0 z-[10] pb-[20px]">
        <RadioPlayer />
      </div>
    </section>
  );
}
