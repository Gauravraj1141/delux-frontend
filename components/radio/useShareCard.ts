"use client";

import { useCallback, useState } from "react";
import type { Track } from "./trackData";

const CARD_W = 1080;
const CARD_H = 1920;
const SITE_URL = "deluxesalonsongs.com";

/** Load an image and return it (or null on error) */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Draw rounded rect path */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/** Word-wrap text and return lines */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Generate a 1080x1920 share card canvas for a track */
async function generateShareCard(track: Track): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d")!;

  // --- Background gradient (warm dark brown) ---
  const bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
  bg.addColorStop(0, "#1a120b");
  bg.addColorStop(0.4, "#0f0a06");
  bg.addColorStop(0.7, "#0a0704");
  bg.addColorStop(1, "#000000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // --- Subtle radial glow from artwork area ---
  const glow = ctx.createRadialGradient(
    CARD_W / 2, 680, 100,
    CARD_W / 2, 680, 600,
  );
  glow.addColorStop(0, `${track.color}30`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // --- Artwork ---
  const artworkSrc = track.artwork
    || `https://i.ytimg.com/vi/${track.videoId}/hqdefault.jpg`;

  const artImg = await loadImage(artworkSrc);

  const artSize = 580;
  const artX = (CARD_W - artSize) / 2;
  const artY = 420;
  const artRadius = 40;

  // Shadow behind artwork
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 80;
  ctx.shadowOffsetY = 20;
  roundRect(ctx, artX, artY, artSize, artSize, artRadius);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

  // Clip and draw artwork
  ctx.save();
  roundRect(ctx, artX, artY, artSize, artSize, artRadius);
  ctx.clip();
  if (artImg) {
    // Cover-fit the image into the square
    const imgW = artImg.width;
    const imgH = artImg.height;
    const scale = Math.max(artSize / imgW, artSize / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = artX + (artSize - drawW) / 2;
    const drawY = artY + (artSize - drawH) / 2;
    ctx.drawImage(artImg, drawX, drawY, drawW, drawH);
  } else {
    // Fallback gradient
    const grad = ctx.createLinearGradient(artX, artY, artX + artSize, artY + artSize);
    grad.addColorStop(0, track.color);
    grad.addColorStop(1, "rgba(255,255,255,0.15)");
    ctx.fillStyle = grad;
    ctx.fillRect(artX, artY, artSize, artSize);
  }
  ctx.restore();

  // --- Song title ---
  const titleY = artY + artSize + 100;
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = "bold 64px Inter, -apple-system, sans-serif";
  const titleLines = wrapText(ctx, track.title, CARD_W - 160);
  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillText(titleLines[i], CARD_W / 2, titleY + i * 78);
  }

  // --- Artist ---
  const artistY = titleY + titleLines.length * 78 + 20;
  ctx.fillStyle = "rgba(255, 255, 255, 0.50)";
  ctx.font = "500 40px Inter, -apple-system, sans-serif";
  ctx.fillText(track.artist, CARD_W / 2, artistY);

  // --- "Now Playing on" label ---
  const brandY = CARD_H - 260;
  ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
  ctx.font = "500 30px Inter, -apple-system, sans-serif";
  ctx.fillText("Now playing on", CARD_W / 2, brandY);

  // --- Brand name ---
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "bold 52px Inter, -apple-system, sans-serif";
  ctx.fillText("Deluxe Salon Songs", CARD_W / 2, brandY + 70);

  // --- URL ---
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "400 28px Inter, -apple-system, sans-serif";
  ctx.fillText(SITE_URL, CARD_W / 2, brandY + 130);

  // --- EQ bars decoration near top ---
  const eqY = 240;
  const barColors = ["rgba(74, 222, 128, 0.7)", "rgba(74, 222, 128, 0.5)", "rgba(74, 222, 128, 0.6)"];
  const barHeights = [40, 55, 35];
  const barW = 8;
  const barGap = 6;
  const eqTotalW = 3 * barW + 2 * barGap;
  const eqX = (CARD_W - eqTotalW) / 2;
  for (let i = 0; i < 3; i++) {
    const bx = eqX + i * (barW + barGap);
    const bh = barHeights[i];
    ctx.fillStyle = barColors[i];
    roundRect(ctx, bx, eqY - bh / 2, barW, bh, barW / 2);
    ctx.fill();
  }

  // --- "Listen now" CTA pill ---
  const ctaY = artistY + 80;
  const ctaText = "Listen now";
  ctx.font = "600 32px Inter, -apple-system, sans-serif";
  const ctaW = ctx.measureText(ctaText).width + 72;
  const ctaH = 64;
  const ctaX = (CARD_W - ctaW) / 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.10)";
  roundRect(ctx, ctaX, ctaY, ctaW, ctaH, ctaH / 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, ctaX, ctaY, ctaW, ctaH, ctaH / 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.80)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ctaText, CARD_W / 2, ctaY + ctaH / 2);
  ctx.textBaseline = "alphabetic";

  // Convert to blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
      "image/png",
    );
  });
}

export type ShareState = "idle" | "generating" | "sharing" | "error";

export function useShareCard() {
  const [shareState, setShareState] = useState<ShareState>("idle");

  const share = useCallback(async (track: Track) => {
    try {
      setShareState("generating");

      const blob = await generateShareCard(track);
      const file = new File([blob], "deluxe-salon-songs.png", { type: "image/png" });

      const shareData: ShareData = {
        title: track.title,
        text: `Listening to ${track.title} by ${track.artist} on Deluxe Salon Songs`,
      };

      setShareState("sharing");

      // Try file sharing first
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
      } else if (navigator.share) {
        // Fallback: share URL + text only
        await navigator.share({
          ...shareData,
          url: "https://deluxesalonsongs.com",
        });
      } else {
        // No Web Share API: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${track.title} - Deluxe Salon Songs.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setShareState("idle");
    } catch (err: unknown) {
      // User cancelled share — not an error
      if (err instanceof Error && err.name === "AbortError") {
        setShareState("idle");
        return;
      }
      console.error("Share failed:", err);
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2000);
    }
  }, []);

  return { share, shareState };
}
