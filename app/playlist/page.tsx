import type { Metadata } from "next";
import PlaylistIndexClient from "./PlaylistIndexClient";

export const metadata: Metadata = {
  title: "Playlists",
  description:
    "Browse all Deluxe Salon Songs playlists — curated 90s Bollywood radio rotations.",
  alternates: {
    canonical: "https://deluxesalonsongs.com/playlist",
  },
};

export default function PlaylistIndexPage() {
  return <PlaylistIndexClient />;
}
