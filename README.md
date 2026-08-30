# Pebble One — Fieldtone Audio

A Next.js 14 (App Router) product landing page for "Pebble One," built around
your 40-frame disassembly sequence as a scroll-scrubbed hero animation.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel

**Option A — via GitHub (recommended)**
1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — no config needed. Click Deploy.

**Option B — via CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts; it will build and give you a live URL.

## What to edit

- **Copy & pricing** — `components/CTA.tsx`, `components/Specs.tsx` (the
  `SPECS` array), `components/Features.tsx`.
- **Brand name** — currently "Fieldtone" / "Pebble One" throughout
  `components/Nav.tsx`, `app/layout.tsx` (metadata), `components/Footer.tsx`.
- **Colors/fonts** — `tailwind.config.ts` (color tokens) and
  `app/layout.tsx` (Google Fonts: Space Grotesk, Inter, JetBrains Mono).
- **Frame sequence** — `public/frames/frame-001.jpg` … `frame-040.jpg`.
  To swap in a different sequence, keep the same zero-padded naming and
  update `FRAME_COUNT` in `components/ExplodeHero.tsx` if the count changes.
- **Schematic callouts** — the `CALLOUTS` array in `ExplodeHero.tsx` controls
  the labels that fade in/out over the animation, keyed to scroll progress
  (0–1).

## Notes

- The hero respects `prefers-reduced-motion`: it shows the final assembled
  frame as a static image instead of scroll-scrubbing.
- All 40 frames are preloaded on mount for a smooth scrub — they're small
  JPEGs (~10KB each) so this stays fast, but if you swap in a much larger
  sequence, consider compressing further.
- The spec numbers (battery life, IPX7 rating, weight, price, ship date) are
  placeholder content — swap in your real numbers before launch.
