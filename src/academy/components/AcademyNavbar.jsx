const links = [
  ["#programas", "Programas"],
  ["#preguntas", "Preguntas"],
];

export default function AcademyNavbar() {
  return (
    <header className="academy-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090909]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <a href="/" className="group flex items-center gap-3" aria-label="Volver a DAMTARO Licensing">
          <span className="flex h-9 w-9 items-center justify-center border border-orange-400/60 font-display text-sm font-bold text-orange-300">D</span>
          <span className="leading-tight"><span className="block font-display text-sm font-bold tracking-[0.16em]">DAMTARO</span><span className="block text-[9px] font-semibold uppercase tracking-[0.29em] text-orange-300">Academy</span></span>
        </a>
        <nav aria-label="Navegación de Academy" className="hidden items-center gap-7 lg:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="text-xs font-medium text-white/65 transition-colors hover:text-white">{label}</a>)}
          <a href="/" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-orange-300/70 hover:text-orange-200">Volver a DAMTARO</a>
        </nav>
        <a href="#programas" className="rounded-full bg-orange-500 px-4 py-2.5 text-xs font-bold text-black transition-transform hover:-translate-y-0.5 sm:px-5">Ver programas</a>
      </div>
      <nav aria-label="Secciones" className="flex gap-5 overflow-x-auto px-5 pb-3 lg:hidden">
        {links.map(([href, label]) => <a key={href} href={href} className="shrink-0 text-xs text-white/65">{label}</a>)}
        <a href="/" className="shrink-0 text-xs font-semibold text-orange-200">DAMTARO</a>
      </nav>
    </header>
  );
}
