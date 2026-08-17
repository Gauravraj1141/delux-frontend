"use client";

import TrackCarousel from "./TrackCarousel";
import PlayerControls from "./PlayerControls";
import { usePlayer } from "./PlayerContext";

export default function RadioPlayer() {
  const {
    currentTrack,
    visibleTracks,
    state,
    currentTime,
    duration,
    volume,
    muted,
    loop,
    shuffleOn,
    statusText,
    goToTrack,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleLoop,
    toggleShuffle,
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <section className="w-full pt-14 pb-4">
      <div className="max-w-[900px] mx-auto px-4 md:px-6">
        <TrackCarousel
          visibleTracks={visibleTracks}
          onSelectTrack={(offset) => goToTrack(offset)}
          currentTrack={currentTrack}
        />

        <div className="mt-14 md:mt-8 max-w-[680px] mx-auto">
          <PlayerControls
            track={currentTrack}
            isPlaying={state === "playing"}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            muted={muted}
            onTogglePlay={togglePlay}
            onNext={() => goToTrack(1)}
            onPrevious={() => goToTrack(-1)}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
            loop={loop}
            onToggleLoop={toggleLoop}
            shuffleOn={shuffleOn}
            onShuffle={toggleShuffle}
            status={statusText}
          />
        </div>
      </div>
    </section>
  );
}
