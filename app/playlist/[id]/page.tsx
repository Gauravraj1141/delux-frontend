import type { Metadata } from "next";
import PlaylistPageClient from "./PlaylistPageClient";

export const metadata: Metadata = {
  title: "Playlist",
  description: "Browse songs in this Deluxe Salon Songs playlist.",
};

export default function PlaylistPage() {
  return <PlaylistPageClient />;
}
