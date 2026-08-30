const FEATURES = [
  {
    title: "Waterproof, properly",
    body: "IPX7-rated. Leave it out in the rain, drop it in the sink, rinse the sand off after the beach.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <path
          d="M16 4c4 6 8 10.5 8 15a8 8 0 1 1-16 0c0-4.5 4-9 8-15Z"
          stroke="#8FCBAF"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Small enough to forget",
    body: "210 grams, fits in a jacket pocket. You'll notice it's there when the sound starts, not before.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <rect x="9" y="4" width="14" height="24" rx="4" stroke="#8FCBAF" strokeWidth="1.5" />
        <circle cx="16" cy="24" r="1.4" fill="#8FCBAF" />
      </svg>
    ),
  },
  {
    title: "Comes apart clean",
    body: "Three parts, screw-free. A five-year repair kit means a dead cell doesn't mean a dead speaker.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="6" stroke="#8FCBAF" strokeWidth="1.5" />
        <circle cx="21" cy="21" r="4" stroke="#8FCBAF" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-mint">
          Built for outside
        </p>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-t border-moss/40 pt-6">
              {f.icon}
              <h3 className="mt-4 font-display text-lg font-semibold text-mist">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/60">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
