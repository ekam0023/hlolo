"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 96;
const framePath = (i: number) =>
  `/frames/frame-${String(i).padStart(3, "0")}.jpg`;

type Callout = {
  label: string;
  detail: string;
  from: number; // progress range start (0-1)
  to: number; // progress range end (0-1)
  top: string;
  left: string;
  align?: "left" | "right";
};

const CALLOUTS: Callout[] = [
  {
    label: "01 — Shell",
    detail: "Recycled silicone, screw-free. Comes apart in one twist.",
    from: 0.12,
    to: 0.34,
    top: "20%",
    left: "10%",
  },
  {
    label: "02 — Board",
    detail: "Sealed against rain and dust. Bluetooth 5.3 inside.",
    from: 0.34,
    to: 0.58,
    top: "46%",
    left: "68%",
    align: "right",
  },
  {
    label: "03 — Cell",
    detail: "1,800 mAh. Fourteen hours at half volume.",
    from: 0.5,
    to: 0.72,
    top: "58%",
    left: "12%",
  },
  {
    label: "04 — Driver",
    detail: "40mm, full-range. Tuned for outdoors, not shelves.",
    from: 0.68,
    to: 0.9,
    top: "30%",
    left: "66%",
    align: "right",
  },
];

export default function ExplodeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const lastDrawnRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    let img = imagesRef.current[index];

    // If this exact frame hasn't finished decoding yet, don't skip the
    // draw entirely — fall back to the nearest frame that HAS loaded so
    // scrolling still looks continuous while the rest load in.
    if (!img || !img.complete) {
      const fallback = imagesRef.current[lastDrawnRef.current];
      if (!fallback || !fallback.complete) return;
      img = fallback;
    } else {
      lastDrawnRef.current = index;
    }

    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    // cover-fit the image inside the canvas
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = cssW / cssH;
    let drawW: number, drawH: number, dx: number, dy: number;
    if (imgRatio > boxRatio) {
      drawH = cssH;
      drawW = drawH * imgRatio;
      dx = (cssW - drawW) / 2;
      dy = 0;
    } else {
      drawW = cssW;
      drawH = drawW / imgRatio;
      dx = 0;
      dy = (cssH - drawH) / 2;
    }
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  const updateFromScroll = useCallback(() => {
    rafRef.current = null;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const raw = total > 0 ? -rect.top / total : 0;
    const clamped = Math.min(1, Math.max(0, raw));
    progressRef.current = clamped;
    setProgress(clamped);

    const idx = Math.min(
      FRAME_COUNT - 1,
      Math.round(clamped * (FRAME_COUNT - 1))
    );
    frameRef.current = idx;
    drawFrame(idx);
  }, [drawFrame]);

  const onScroll = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(updateFromScroll);
    }
  }, [updateFromScroll]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let remaining = FRAME_COUNT;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        remaining -= 1;
        if (remaining === 0 && !cancelled) {
          setLoaded(true);
          const startIdx = reducedMotionRef.current ? FRAME_COUNT - 1 : 0;
          frameRef.current = startIdx;
          drawFrame(startIdx);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    if (!reducedMotionRef.current) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headlineOpacity = 1 - Math.min(1, progress / 0.12);
  const closingOpacity = Math.max(0, (progress - 0.9) / 0.1);

  return (
    <div ref={containerRef} className="relative h-[420vh]" id="top">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-mist/50">
              Loading Pebble One
            </span>
          </div>
        )}

        {/* Opening headline */}
        <div
          className="absolute inset-x-0 top-0 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity"
          style={{ opacity: headlineOpacity, pointerEvents: "none" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-mint mb-5">
            Fieldtone — Pebble One
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-mist md:text-6xl">
            Every part earns its place.
          </h1>
          <p className="mt-5 max-w-md text-sm text-mist/60 md:text-base">
            Three components. No screws. Scroll to see it come apart —
            and go right back together.
          </p>
          <div className="mt-10 flex flex-col items-center gap-2 text-mist/40">
            <span className="font-mono text-[10px] uppercase tracking-widest2">
              Scroll
            </span>
            <span className="h-8 w-px animate-pulse bg-mist/40" />
          </div>
        </div>

        {/* Schematic callouts */}
        {CALLOUTS.map((c) => {
          const mid = (c.from + c.to) / 2;
          const span = (c.to - c.from) / 2;
          const dist = Math.abs(progress - mid);
          const visible = dist < span;
          const opacity = visible ? 1 - dist / span : 0;
          return (
            <div
              key={c.label}
              className="pointer-events-none absolute max-w-[220px] transition-opacity duration-150"
              style={{
                top: c.top,
                left: c.left,
                opacity,
                textAlign: c.align === "right" ? "right" : "left",
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-mint">
                {c.label}
              </p>
              <p className="mt-1 font-mono text-[11px] leading-snug text-mist/70">
                {c.detail}
              </p>
            </div>
          );
        })}

        {/* Closing line */}
        <div
          className="absolute inset-x-0 bottom-16 flex flex-col items-center px-6 text-center transition-opacity"
          style={{ opacity: closingOpacity, pointerEvents: "none" }}
        >
          <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">
            Then it closes back up.
          </h2>
          <p className="mt-2 text-sm text-mist/60">
            Silicone shell. One button. Nothing to lose.
          </p>
        </div>
      </div>
    </div>
  );
}
