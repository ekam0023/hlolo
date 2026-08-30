export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-moss/40 pt-8 text-mist/50 md:flex-row">
        <span className="font-display text-sm">FIELDTONE</span>
        <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-widest2">
          <a href="#top" className="hover:text-mist transition-colors">
            Top
          </a>
          <a href="#specs" className="hover:text-mist transition-colors">
            Specs
          </a>
          <a href="#reserve" className="hover:text-mist transition-colors">
            Reserve
          </a>
        </nav>
        <span className="font-mono text-[11px]">© 2026 Fieldtone Audio</span>
      </div>
    </footer>
  );
}
