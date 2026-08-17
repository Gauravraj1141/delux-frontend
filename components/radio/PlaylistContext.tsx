"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { Track } from "./trackData";
import { tracks as hardcodedTracks } from "./trackData";

const API_BASE = "https://api.deluxesalonsongs.com";

interface Playlist {
  id: number;
  title: string;
  writer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface PlaylistContextValue {
  tracks: Track[];
  loading: boolean;
  playlists: Playlist[];
  activePlaylistId: number | null;
  loadPlaylist: (id: number) => void;
  shuffleTracks: () => void;
}

const PlaylistContext = createContext<PlaylistContextValue>({
  tracks: hardcodedTracks,
  loading: true,
  playlists: [],
  activePlaylistId: null,
  loadPlaylist: () => {},
  shuffleTracks: () => {},
});

export function usePlaylist() {
  return useContext(PlaylistContext);
}

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>(hardcodedTracks);
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null);
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

        const data: Playlist[] = await playlistsRes.json();
        if (!data.length) throw new Error("No playlists found");

        setPlaylists(data);

        // Check URL for persisted playlist + song
        const urlParams = new URLSearchParams(window.location.search);
        const urlPlaylistId = urlParams.get("playlist");
        const urlSongId = urlParams.get("song");
        const matchedPlaylist = urlPlaylistId
          ? data.find((p) => String(p.id) === urlPlaylistId)
          : null;
        const playlistId = matchedPlaylist ? matchedPlaylist.id : data[0].id;
        setActivePlaylistId(playlistId);

        const songsRes = await fetch(
          `${API_BASE}/api/v1/playlists/${playlistId}/songs`,
          { signal: AbortSignal.timeout(10000) },
        );
        if (!songsRes.ok) throw new Error("Failed to fetch songs");

        const songs: Track[] = await songsRes.json();
        if (!songs.length) throw new Error("No songs found");

        setTracks(songs);
        setLoading(false);
      } catch {
        setTracks(hardcodedTracks);
        setLoading(false);
      }
    })();
  }, []);

  const loadPlaylist = useCallback(async (id: number) => {
    if (id === activePlaylistId) return;
    setLoading(true);
    setActivePlaylistId(id);
    try {
      const res = await fetch(`${API_BASE}/api/v1/playlists/${id}/songs`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error("Failed to fetch songs");
      const songs: Track[] = await res.json();
      if (!songs.length) throw new Error("No songs found");
      setTracks(shuffle(songs));
    } catch {
      // keep current tracks on failure
    }
    setLoading(false);
  }, [activePlaylistId]);

  const shuffleTracks = useCallback(() => {
    setTracks((prev) => shuffle(prev));
  }, []);

  return (
    <PlaylistContext value={{
      tracks,
      loading,
      playlists,
      activePlaylistId,
      loadPlaylist,
      shuffleTracks,
    }}>
      {children}
    </PlaylistContext>
  );
}
