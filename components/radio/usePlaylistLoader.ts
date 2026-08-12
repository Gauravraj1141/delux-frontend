"use client";

import { useState, useEffect, useRef } from "react";
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

export function usePlaylistLoader(): PlaylistState {
  const [state, setState] = useState<PlaylistState>({
    tracks: hardcodedTracks,
    loading: true,
    source: "hardcoded",
  });
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        // Step 1: Fetch all playlists
        const playlistsRes = await fetch(`${API_BASE}/api/v1/playlists`, {
          signal: AbortSignal.timeout(8000),
        });
        if (!playlistsRes.ok) throw new Error("Failed to fetch playlists");

        const playlists: Playlist[] = await playlistsRes.json();
        if (!playlists.length) throw new Error("No playlists found");

        // Pick the first playlist
        const playlistId = playlists[0].id;

        // Step 2: Fetch songs for that playlist
        const songsRes = await fetch(
          `${API_BASE}/api/v1/playlists/${playlistId}/songs`,
          { signal: AbortSignal.timeout(10000) },
        );
        if (!songsRes.ok) throw new Error("Failed to fetch songs");

        const songs: Track[] = await songsRes.json();
        if (!songs.length) throw new Error("No songs found");

        setState({ tracks: songs, loading: false, source: "api" });
      } catch {
        // Fallback to hardcoded data
        setState({ tracks: hardcodedTracks, loading: false, source: "hardcoded" });
      }
    })();
  }, []);

  return state;
}
