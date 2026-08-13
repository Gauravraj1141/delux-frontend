"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Track } from "./trackData";
import { tracks as hardcodedTracks } from "./trackData";

const API_BASE = "https://api.deluxesalonsongs.com";

interface Playlist {
  id: number;
  title: string;
  writer: string;
}

interface PlaylistState {
  tracks: Track[];
  loading: boolean;
  source: "api" | "hardcoded";
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function usePlaylistLoader() {
  const [state, setState] = useState<PlaylistState>({
    tracks: hardcodedTracks,
    loading: true,
    source: "hardcoded",
  });
  const originalTracksRef = useRef<Track[]>(hardcodedTracks);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const playlistsRes = await fetch(`${API_BASE}/api/v1/playlists`, {
          signal: AbortSignal.timeout(8000),
        });
        if (!playlistsRes.ok) throw new Error("Failed to fetch playlists");

        const playlists: Playlist[] = await playlistsRes.json();
        if (!playlists.length) throw new Error("No playlists found");

        const playlistId = playlists[0].id;

        const songsRes = await fetch(
          `${API_BASE}/api/v1/playlists/${playlistId}/songs`,
          { signal: AbortSignal.timeout(10000) },
        );
        if (!songsRes.ok) throw new Error("Failed to fetch songs");

        const songs: Track[] = await songsRes.json();
        if (!songs.length) throw new Error("No songs found");

        const shuffled = shuffle(songs);
        originalTracksRef.current = songs;
        setState({ tracks: shuffled, loading: false, source: "api" });
      } catch {
        const shuffled = shuffle(hardcodedTracks);
        originalTracksRef.current = hardcodedTracks;
        setState({ tracks: shuffled, loading: false, source: "hardcoded" });
      }
    })();
  }, []);

  const shuffleTracks = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tracks: shuffle(prev.tracks),
    }));
  }, []);

  return { ...state, shuffleTracks };
}
