export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
      <a href="#top" className="flex items-baseline gap-2 text-mist">
        <span className="font-display font-bold text-lg tracking-tight">FIELDTONE</span>
        <span className="hidden sm:inline font-mono text-[11px] text-mist/60 tracking-widest2 uppercase">
          — Pebble One
        </span>
      </a>
      <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest2 text-mist/80">
        <a href="#specs" className="hover:text-mist transition-colors">
          Specs
        </a>
        <a
          href="#reserve"
          className="hidden sm:inline-flex items-center border border-mist/40 rounded-full px-4 py-2 hover:border-mist hover:text-mist transition-colors"
        >
          Reserve
        </a>
      </nav>
    </header>
  );
}
