export default function AcademyFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080808]">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="Volver a DAMTARO Licensing"><span className="flex h-9 w-9 items-center justify-center border border-orange-400/50 font-display text-sm font-bold text-orange-300">D</span><span className="font-display text-xs font-bold tracking-[0.18em]">DAMTARO <span className="text-orange-300">ACADEMY</span></span></a>
        <nav aria-label="Enlaces de pie" className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/50"><a href="#programas" className="hover:text-white">Programas</a><a href="#preguntas" className="hover:text-white">Preguntas</a><a href="/" className="font-semibold text-white/75 hover:text-orange-200">Volver a DAMTARO</a></nav>
        <p className="text-[10px] text-white/30">© 2026 DAMTARO</p>
      </div>
    </footer>
  );
}
