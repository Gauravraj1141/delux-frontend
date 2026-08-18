import type { Metadata } from "next";
import Link from "next/link";
import { RIGHTS_TEXT, REMOVAL_TEXT, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Deluxe Salon Songs — the story behind the live 90s Bollywood radio that plays the music of Indian barbershops, truck cabins, and highway dhabas.",
  alternates: {
    canonical: "https://deluxesalonsongs.com/about",
  },
};

const glass = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
} as const;

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,69,19,0.12) 0%, transparent 70%)" }} aria-hidden />

      <div className="relative z-10 max-w-[1040px] mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors duration-200 mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back to radio
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/images/logo.png"
              alt="Deluxe Salon Songs"
              className="w-11 h-11 rounded-full"
            />
            <div>
              <h1 className="text-[22px] md:text-[26px] font-bold text-white/90 leading-tight">
                Deluxe Salon Songs
              </h1>
              <p className="text-[13px] text-white/40 mt-0.5">
                डीलक्स सैलून सॉन्ग्स
              </p>
            </div>
          </div>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-white/60">
            A live radio that plays the songs you hear in Indian barbershops, truck cabins, and highway dhabas — the 90s Hindi film music that never really stopped playing.
          </p>
        </div>

        {/* Content sections */}
        <div className="flex flex-col gap-10">
          {/* The Story */}
          <Section label="The Story">
            <div className="rounded-2xl p-5 md:p-6" style={glass}>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-white/55">
                Walk into any small-town salon in India and you&apos;ll hear it — a tinny speaker playing Kumar Sanu, Udit Narayan, or Alka Yagnik on loop. The same cassette, the same songs, decade after decade. That tape never stops.
              </p>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-white/55 mt-4">
                Deluxe Salon Songs is that tape, turned into a radio station. We curate the exact kind of music that fills neighbourhood barbershops, chai stalls on national highways, and the cabins of trucks crossing state borders at 2 AM. No algorithms, no trending charts — just the songs that India actually listens to.
              </p>
            </div>
          </Section>

          {/* What We Play */}
          <Section label="What We Play">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "90s Salon Vibe 💇", desc: "The evergreen 90s hits that every barber knows by heart" },
                { title: "Monsoon Special ⛈️", desc: "Rain-soaked melodies for when the skies open up" },
                { title: "Golden Ghazals 🪘", desc: "Timeless ghazals that speak straight to the soul" },
                { title: "Feel Good 🧡", desc: "Warm, uplifting songs to brighten your day" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-4" style={glass}>
                  <p className="text-[13px] font-semibold text-white/80">{item.title}</p>
                  <p className="text-[12px] text-white/40 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* How It Works */}
          <Section label="How It Works">
            <div className="rounded-2xl p-5 md:p-6" style={glass}>
              <div className="flex flex-col gap-4">
                {[
                  { num: "01", text: "We hand-pick songs from 90s Bollywood soundtracks and regional favourites" },
                  { num: "02", text: "Songs are organized into themed playlists (rotations) that you can switch between" },
                  { num: "03", text: "Audio plays through YouTube's embedded player — nothing is hosted on our servers" },
                  { num: "04", text: "Hit play, and it keeps going. Like a real radio, but one you can skip and shuffle" },
                ].map((step) => (
                  <div key={step.num} className="flex gap-3.5 items-start">
                    <span className="text-[11px] font-bold text-white/20 mt-0.5 flex-shrink-0 tabular-nums">{step.num}</span>
                    <p className="text-[13px] md:text-[14px] text-white/50 leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Rights */}
          <Section label="Rights & Credits">
            <div className="rounded-2xl p-5 md:p-6" style={glass}>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-white/45">
                {RIGHTS_TEXT}
              </p>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-white/45 mt-3">
                {REMOVAL_TEXT}
              </p>
            </div>
          </Section>

          {/* FAQ */}
          <Section label="Frequently Asked Questions">
            <div className="flex flex-col gap-3">
              {[
                {
                  q: "What is Deluxe Salon Songs?",
                  a: "Deluxe Salon Songs (also called Delux Salon, Deluxe Saloon, Delux Saloon, डीलक्स सैलून) is a free online radio that plays 90s Bollywood music — the songs you hear in Indian barbershops, truck cabins, and highway dhabas. It plays 24/7 at deluxesalonsongs.com.",
                },
                {
                  q: "Is Deluxe Salon Songs free?",
                  a: "Yes, completely free. No sign-up, no ads, no subscriptions. All music plays through YouTube\u2019s embedded player.",
                },
                {
                  q: "What kind of music does it play?",
                  a: "90s Bollywood film music, ghazals, romantic ballads, and retro Hindi songs — Kumar Sanu, Udit Narayan, Alka Yagnik, Lata Mangeshkar, and more.",
                },
                {
                  q: "Is this the same as Delux Salon or Deluxe Saloon?",
                  a: "Yes! People search for it as Delux Salon, Deluxe Saloon, Salon Wala, DeluxeSalon, and डीलक्स सैलून. They all lead to the same site.",
                },
                {
                  q: "Can I request a song?",
                  a: "We don\u2019t take live requests yet, but you can email us song suggestions and we may add them to a future playlist.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-xl p-4 md:p-5" style={glass}>
                  <p className="text-[13px] md:text-[14px] font-semibold text-white/75">{item.q}</p>
                  <p className="text-[12px] md:text-[13px] text-white/45 mt-1.5 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section label="Get in Touch">
            <div className="rounded-2xl p-5 md:p-6" style={glass}>
              <p className="text-[13px] md:text-[14px] text-white/50 mb-3">
                Got a song suggestion or a rights concern?
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white/90 transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {CONTACT_EMAIL}
              </a>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/20">
            &copy; 2026 deluxesalonsongs.com
          </p>
        </div>
      </div>
    </main>
  );
}
