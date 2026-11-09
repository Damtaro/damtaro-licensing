const studio = "/academy-studio.png";

export default function AcademyHero() {
  return (
    <section className="academy-hero relative isolate flex min-h-[680px] items-end overflow-hidden pt-32 sm:min-h-[730px] sm:pt-36 lg:min-h-[780px]" aria-labelledby="academy-title">
      <img src={studio} alt="Productor trabajando en un estudio de música" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090909] via-transparent to-black/25" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:pb-36">
        <div className="max-w-3xl animate-academy-rise">
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.36em] text-orange-300 sm:text-xs"><span className="h-px w-9 bg-orange-400" />Un espacio para crear con intención</p>
          <h1 id="academy-title" className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[0.99] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">El sonido que imaginas <span className="text-orange-300">empieza contigo.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Formación en producción musical con FL Studio, en dos recorridos para aprender, practicar y profundizar a tu ritmo.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#programas" className="inline-flex min-h-14 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-bold text-black transition-transform hover:-translate-y-1">Ver los programas <span aria-hidden="true" className="ml-3">↗</span></a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 sm:mt-16 sm:gap-x-12 sm:text-[10px]"><span>4 meses · Intensivo</span><span className="hidden h-1 w-1 rounded-full bg-orange-400 sm:block" /><span>7 meses · Integral</span><span className="hidden h-1 w-1 rounded-full bg-orange-400 sm:block" /><span>Formación con FL Studio</span></div>
      </div>
      <span aria-hidden="true" className="absolute bottom-24 right-8 hidden font-display text-[10px] uppercase tracking-[0.34em] text-white/35 [writing-mode:vertical-rl] lg:block">DAMTARO ACADEMY · 01</span>
    </section>
  );
}
