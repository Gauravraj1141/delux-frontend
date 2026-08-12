import { ExternalLink } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function MusicLinks() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-6 md:py-8 bg-background">
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center gap-5">
          <a
            href={EXTERNAL_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            Spotify
            <ExternalLink size={11} className="opacity-60" />
          </a>
          <a
            href={EXTERNAL_LINKS.ytMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            YT Music
            <ExternalLink size={11} className="opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
}
