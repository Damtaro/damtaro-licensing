export default function AcademyCTA() {
  return (
    <section className="academy-section px-5 pb-14 sm:px-8 sm:pb-16" aria-labelledby="cta-title">
      <div className="relative mx-auto max-w-7xl overflow-hidden border border-orange-200/15 bg-[radial-gradient(ellipse_at_78%_20%,rgba(249,115,22,0.16),transparent_38%),linear-gradient(120deg,#15110f,#0d0d0d_65%)] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
        <span aria-hidden="true" className="absolute -right-5 -top-16 font-display text-[210px] font-bold leading-none text-white/[0.025] sm:right-10 sm:text-[280px]">D</span>
        <div className="relative max-w-3xl"><p className="academy-eyebrow">El siguiente paso es tuyo</p><h2 id="cta-title" className="mt-4 text-balance font-display text-3xl leading-tight tracking-[-0.045em] sm:text-5xl">Elige tu programa. <span className="text-orange-300">Empieza a crear.</span></h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">Encuentra el recorrido que acompaña tu forma de aprender y da el primer paso hacia tu formación en producción musical con FL Studio.</p><a href="#programas" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-bold text-black transition-transform hover:-translate-y-1">Elegir un programa <span aria-hidden="true" className="ml-3">↗</span></a></div>
      </div>
    </section>
  );
}
