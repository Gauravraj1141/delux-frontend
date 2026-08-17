import { SmogEffects, PresenceTracker, PlaylistBar, HeroWeather, HeroPlayer } from "./HeroClient";

function getHeroImage(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "/images/salon-morning.webp";
  if (hour >= 11 && hour < 16) return "/images/salon-noon.webp";
  if (hour >= 16 && hour < 20) return "/images/salon-evening.webp";
  return "/images/salon-night.webp";
}

export default function Hero() {
  const heroImage = getHeroImage();

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Background image — server-rendered for fast LCP */}
      <img
        src={heroImage}
        alt="Illustration of an Indian street-side barbershop"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
        fetchPriority="high"
        decoding="async"
      />

      {/* Subtle top gradient for header readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-[1] pointer-events-none" />

      {/* Static top smog gradient — always rendered (no JS needed) */}
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
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/50 to-transparent z-[1]" />

      {/* Static bottom smog gradient — always rendered */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none"
        style={{ height: "70%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.04) 80%, transparent 95%)",
          }}
        />
      </div>

      {/* Animated smog layers — client component, desktop only */}
      <SmogEffects />

      {/* Title overlay — server-rendered for instant LCP */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-[12vh] sm:pt-[15vh] md:pt-[10vh] px-5 z-[3] pointer-events-none">
        <h1
          className="hero-heading text-[3.5rem] sm:text-[5.5rem] md:text-[5.5rem] lg:text-[7rem] font-bold text-white text-center leading-[0.95]"
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
        <PresenceTracker />
      </div>

      {/* Playlist bar — own stacking context above coverflow */}
      <div className="absolute inset-x-0 top-[calc(12vh+9rem)] sm:top-[calc(15vh+12rem)] md:top-[calc(10vh+12rem)] lg:top-[calc(10vh+15rem)] z-[15] flex justify-center px-5 pointer-events-none">
        <PlaylistBar />
      </div>

      {/* Weather card — top right, hidden on mobile */}
      <HeroWeather />

      {/* Radio player pinned to bottom of hero */}
      <HeroPlayer />
    </section>
  );
}
