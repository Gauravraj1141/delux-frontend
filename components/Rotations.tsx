"use client";

import { usePlaylist } from "@/components/radio/PlaylistContext";

export default function Rotations() {
  const { playlists, activePlaylistId, loadPlaylist } = usePlaylist();

  if (!playlists.length) return null;

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
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              type="button"
              onClick={() => loadPlaylist(playlist.id)}
              className={`text-[14px] md:text-[15px] transition-colors duration-200 cursor-pointer ${
                playlist.id === activePlaylistId
                  ? "text-white font-semibold underline underline-offset-4 decoration-white/40"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {playlist.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
