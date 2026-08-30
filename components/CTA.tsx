export default function CTA() {
  return (
    <section id="reserve" className="bg-mist py-24 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-moss">
          Reserve
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-5xl">
          Pebble One
        </h2>
        <p className="mt-4 text-graphite">
          $79. Ships October. Made in one colorway, on purpose.
        </p>
        <a
          href="#"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-mist transition-colors hover:bg-moss"
        >
          Reserve — $10 deposit
        </a>
        <p className="mt-4 font-mono text-[11px] text-graphite/70">
          Refundable anytime before it ships.
        </p>
      </div>
    </section>
  );
}
