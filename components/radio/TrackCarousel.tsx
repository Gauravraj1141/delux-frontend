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
      {/* Ambient blurred background from current track */}
      <div
        className="absolute inset-0 -inset-x-20 -inset-y-16 overflow-hidden rounded-3xl"
        aria-hidden
      >
        <div
          className="absolute inset-0 scale-150 blur-[80px] opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, ${currentTrack.color} 0%, transparent 70%)`,
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
