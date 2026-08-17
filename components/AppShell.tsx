"use client";

import { usePathname } from "next/navigation";
import { PlaylistProvider } from "@/components/radio/PlaylistContext";
import { PlayerProvider } from "@/components/radio/PlayerContext";
import Header from "@/components/Header";
import MiniPlayer from "@/components/radio/MiniPlayer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <PlaylistProvider>
      <PlayerProvider>
        <Header />
        {children}
        {!isHome && <MiniPlayer />}
      </PlayerProvider>
    </PlaylistProvider>
  );
}
