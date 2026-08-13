import TrackCard from "./TrackCard";
import type { Track } from "./trackData";

type Position = "previous-2" | "previous-1" | "current" | "next-1" | "next-2";

const POSITIONS: Position[] = [
  "previous-2",
  "previous-1",
  "current",
  "next-1",
  "next-2",
];

interface TrackCarouselProps {
  visibleTracks: Track[];
  onSelectTrack: (offset: number) => void;
  currentTrack: Track;
}

export default function TrackCarousel({
  visibleTracks,
  onSelectTrack,
  currentTrack,
}: TrackCarouselProps) {
  // offsets: -2, -1, 0, +1, +2
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <div className="relative w-full">
      {/* Ambient blurred background from current track — organic spread */}
      <div
        className="absolute inset-0 overflow-visible pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[115%] blur-[90px] opacity-22"
          style={{
            background: `radial-gradient(ellipse 60% 48% at 50% 50%, ${currentTrack.color} 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute top-[43%] left-[33%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[58%] blur-[70px] opacity-13"
          style={{
            background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute top-[51%] left-[67%] -translate-x-1/2 -translate-y-1/2 w-[35%] h-[50%] blur-[65px] opacity-13"
          style={{
            background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 100%)`,
          }}
        />
      </div>

      {/* Carousel stage with perspective */}
      <div
        className="relative mx-auto h-[200px] sm:h-[280px] md:h-[320px] lg:h-[350px]"
        style={{ perspective: "1000px" }}
      >
        {visibleTracks.map((track, i) => (
          <TrackCard
            key={track.id}
            track={track}
            position={POSITIONS[i]}
            onClick={() => offsets[i] !== 0 && onSelectTrack(offsets[i])}
          />
        ))}
      </div>
    </div>
  );
}
