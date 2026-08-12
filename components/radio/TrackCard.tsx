import type { Track } from "./trackData";
import { getYouTubeThumbnail } from "./trackData";

type Position = "previous-2" | "previous-1" | "current" | "next-1" | "next-2";

interface TrackCardProps {
  track: Track;
  position: Position;
  onClick: () => void;
}

interface PosStyle {
  tx: number; // percentage of card width
  ry: number; // rotateY degrees
  scale: number;
  opacity: number;
  z: number;
}

const POS: Record<Position, { desktop: PosStyle; mobile: PosStyle }> = {
  "previous-2": {
    desktop: { tx: -130, ry: 35, scale: 0.65, opacity: 1, z: 1 },
    mobile:  { tx: -105, ry: 35, scale: 0.55, opacity: 1, z: 1 },
  },
  "previous-1": {
    desktop: { tx: -68, ry: 22, scale: 0.8, opacity: 1, z: 2 },
    mobile:  { tx: -55, ry: 22, scale: 0.72, opacity: 1, z: 2 },
  },
  current: {
    desktop: { tx: 0, ry: 0, scale: 1, opacity: 1, z: 5 },
    mobile:  { tx: 0, ry: 0, scale: 1, opacity: 1, z: 5 },
  },
  "next-1": {
    desktop: { tx: 68, ry: -22, scale: 0.8, opacity: 1, z: 2 },
    mobile:  { tx: 55, ry: -22, scale: 0.72, opacity: 1, z: 2 },
  },
  "next-2": {
    desktop: { tx: 130, ry: -35, scale: 0.65, opacity: 1, z: 1 },
    mobile:  { tx: 105, ry: -35, scale: 0.55, opacity: 1, z: 1 },
  },
};

function lightenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function ArtworkPlaceholder({ track }: { track: Track }) {
  return (
    <div
      className="w-full aspect-square rounded-t-xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${lightenHex(track.color, 60)} 0%, ${track.color} 60%, ${lightenHex(track.color, -20)} 100%)`,
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-end pb-4">
        <div className="text-white/20 text-[8px] tracking-[0.2em] uppercase">
          Deluxe Saloon
        </div>
      </div>
    </div>
  );
}

export default function TrackCard({ track, position, onClick }: TrackCardProps) {
  const isCurrent = position === "current";
  const { desktop, mobile } = POS[position];

  // Build CSS custom properties for responsive transforms
  const style: React.CSSProperties = {
    // @ts-expect-error CSS custom properties
    "--tx-m": `${mobile.tx}%`,
    "--ry-m": `${mobile.ry}deg`,
    "--sc-m": mobile.scale,
    "--op-m": mobile.opacity,
    "--tx-d": `${desktop.tx}%`,
    "--ry-d": `${desktop.ry}deg`,
    "--sc-d": desktop.scale,
    "--op-d": desktop.opacity,
    zIndex: desktop.z,
    transformStyle: "preserve-3d" as const,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="track-card track-card-size absolute left-1/2 top-1/2"
      aria-label={isCurrent ? `Now playing: ${track.title}` : `Play ${track.title}`}
      style={{
        ...style,
        cursor: isCurrent ? "default" : "pointer",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(255,255,255,${isCurrent ? 0.2 : 0.1})`,
          boxShadow: isCurrent
            ? "0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)"
            : "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        {/* Image */}
        <div className="p-1.5 sm:p-2 pb-0 sm:pb-0">
          {track.artwork || track.videoId ? (
            <img
              src={track.artwork || getYouTubeThumbnail(track.videoId)}
              alt={`${track.title} by ${track.artist}`}
              className="w-full aspect-square rounded-xl object-cover"
            />
          ) : (
            <ArtworkPlaceholder track={track} />
          )}
        </div>

        {/* Song info inside the card */}
        <div className="px-2.5 sm:px-3 py-2 sm:py-2.5">
          <p
            className={`font-semibold truncate text-white/90 ${
              isCurrent ? "text-[13px] md:text-[15px]" : "text-[10px] md:text-[12px]"
            }`}
          >
            {track.title}
          </p>
          <p
            className={`truncate text-white/45 ${
              isCurrent ? "text-[11px] md:text-[13px]" : "text-[9px] md:text-[11px]"
            }`}
          >
            {track.artist}
          </p>
        </div>
      </div>
    </button>
  );
}
