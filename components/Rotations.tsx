import Link from "next/link";
import { PLAYLISTS } from "@/lib/constants";

export default function Rotations() {
  return (
    <section
      id="playlists"
      className="w-full px-5 md:px-8 lg:px-12 py-8 md:py-10 bg-background"
    >
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-[12px] uppercase tracking-[0.2em] text-white/30 font-medium mb-4">
          Rotations
        </h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
          {PLAYLISTS.map((playlist) => (
            <Link
              key={playlist.name}
              href={playlist.href}
              className="text-[14px] md:text-[15px] text-white/70 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
