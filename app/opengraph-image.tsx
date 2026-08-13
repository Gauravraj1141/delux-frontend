import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Deluxe Salon Songs — 90s Hindi Songs Radio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a0a0a 0%, #1a1210 40%, #2a1a12 70%, #0a0a0a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,69,19,0.3) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, rgba(192,57,43,0.6), transparent)",
          }}
        />

        {/* Main title in Hindi */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: 700,
            color: "white",
            lineHeight: 0.9,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>डीलक्स</span>
          <span>सैलून सॉन्ग्स</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "8px",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Deluxe Salon Songs · Open All Hours
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: "20px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.35)",
            display: "flex",
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          90s Hindi film songs, playing round the clock
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Green dot */}
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#4ade80",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              display: "flex",
            }}
          >
            deluxsalongsongs.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
