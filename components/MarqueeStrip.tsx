const ITEMS = [
  "IPX7 WATERPROOF",
  "14-HOUR BATTERY",
  "BLUETOOTH 5.3",
  "1.5M DROP-RATED",
  "SCREW-FREE SHELL",
];

export default function MarqueeStrip() {
  const line = ITEMS.join("   ·   ") + "   ·   ";
  return (
    <div className="overflow-hidden border-y border-moss/40 bg-ink py-4">
      <div className="marquee-track flex w-max whitespace-nowrap font-mono text-[11px] uppercase tracking-widest2 text-mist/50">
        <span className="pr-8">{line}</span>
        <span className="pr-8">{line}</span>
      </div>
    </div>
  );
}
