const LEADERS = [
  { id: "shell", label: "01 — SHELL", x1: 172, y1: 298, x2: 40, y2: 340, side: "left" as const },
  { id: "driver", label: "04 — DRIVER", x1: 196, y1: 168, x2: 48, y2: 80, side: "left" as const },
  { id: "board", label: "02 — BOARD", x1: 224, y1: 228, x2: 352, y2: 84, side: "right" as const },
  { id: "cell", label: "03 — CELL", x1: 236, y1: 240, x2: 352, y2: 320, side: "right" as const },
];

const SPECS = [
  ["Battery", "1,800 mAh"],
  ["Playtime", "Up to 14 hr"],
  ["Charging", "USB-C, 2 hr full"],
  ["Weight", "210 g"],
  ["Water resistance", "IPX7"],
  ["Drop rating", "1.5 m"],
  ["Connectivity", "Bluetooth 5.3"],
  ["Range", "12 m, line of sight"],
];

export default function Specs() {
  return (
    <section id="specs" className="bg-mist py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-moss">
            Exploded view
          </p>
          <h2 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Three parts. No adhesive. Nothing hidden.
          </h2>

          <div className="relative mx-auto mt-10 aspect-square w-full max-w-sm">
            <img
              src="/frames/frame-020.jpg"
              alt="Pebble One shown mid-disassembly, revealing the internal board, cell and driver"
              className="h-full w-full rounded-2xl object-cover"
            />
            <svg
              viewBox="0 0 400 400"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {LEADERS.map((l) => (
                <line
                  key={l.id}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="#101B16"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                />
              ))}
              {LEADERS.map((l) => (
                <circle key={`${l.id}-dot`} cx={l.x1} cy={l.y1} r={3} fill="#101B16" />
              ))}
            </svg>
            {LEADERS.map((l) => (
              <span
                key={`${l.id}-label`}
                className="absolute font-mono text-[10px] uppercase tracking-widest2 text-ink/70"
                style={{
                  left: l.side === "left" ? `${(l.x2 / 400) * 100}%` : undefined,
                  right: l.side === "right" ? `${100 - (l.x2 / 400) * 100}%` : undefined,
                  top: `${(l.y2 / 400) * 100}%`,
                  transform:
                    l.side === "left"
                      ? "translate(-4px, -100%)"
                      : "translate(4px, -100%)",
                }}
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-moss">
            Specification
          </p>
          <dl className="mt-6 divide-y divide-moss/20">
            {SPECS.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between py-4"
              >
                <dt className="text-sm text-graphite">{label}</dt>
                <dd className="font-mono text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
