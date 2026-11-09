const programs = [
  {
    id: "intensivo",
    name: "Programa Rápido de Producción, Distribución y Monetización Musical",
    months: 4,
    monthlyPrice: 69,
    label: "Formación acelerada",
    description: "Contenidos seleccionados y menor profundidad frente al programa integral.",
    content: [
      "Producción musical con FL Studio: interfaz, flujo de trabajo y proceso de creación musical.",
      "Mezcla y mastering: ecualización (EQ), compresión y técnicas aplicables en distintos DAW.",
      "Distribución musical y monetización musical.",
    ],
    gumroadUrl: "https://damtarooff.gumroad.com/l/aejvcie",
    featured: false,
  },
  {
    id: "integral",
    name: "Programa Integral de Producción, Distribución y Negocios Musicales",
    months: 7,
    monthlyPrice: 69,
    label: "Formación completa",
    description: "Formación completa, con mayor profundidad y desarrollo detallado.",
    content: [
      "Producción musical con FL Studio: interfaz, flujo de trabajo y proceso de creación musical.",
      "Mezcla y mastering: ecualización (EQ), compresión y técnicas aplicables en distintos DAW.",
      "Distribución musical y negocios musicales.",
    ],
    gumroadUrl: "https://damtarooff.gumroad.com/l/jclvy",
    featured: true,
  },
];

function PaymentSummary({ program }) {
  const total = program.monthlyPrice * program.months;

  return (
    <div className="mt-5 grid grid-cols-2 gap-2" role="group" aria-label={`Modalidades de pago para ${program.name}`}>
      <div className="border border-orange-300/25 bg-orange-300/[0.06] px-3 py-3">
        <p className="text-xs font-semibold text-white/80">Pago completo</p>
        <p role="group" aria-label={`Pago completo: $${total} USD`} className={`mt-1 font-display font-semibold tracking-[-0.04em] text-white ${program.featured ? "text-3xl" : "text-2xl"}`}>
          ${total}<span className="ml-1 font-sans text-xs font-medium tracking-normal text-white/60">USD</span>
        </p>
        <p className="mt-1 text-[10px] leading-4 text-white/45">Cálculo: $69 × {program.months} meses</p>
      </div>
      <div className="border border-white/10 bg-black/20 px-3 py-3">
        <p className="text-xs font-semibold text-white/80">Pago mensual</p>
        <p role="group" aria-label="Pago mensual: $69 USD por mes" className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
          $69<span className="ml-1 font-sans text-xs font-medium tracking-normal text-white/60">USD</span>
        </p>
        <p className="mt-1 text-[10px] leading-4 text-white/45">Por mes · {program.months} meses</p>
      </div>
    </div>
  );
}

export default function AcademyPrograms() {
  return (
    <section id="programas" className="academy-section scroll-mt-28 bg-[#0d0d0d] py-16 sm:py-20" aria-labelledby="programs-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-9 flex flex-col justify-between gap-3 sm:mb-11 md:flex-row md:items-end">
          <div>
            <p className="academy-eyebrow">Dos caminos posibles</p>
            <h2 id="programs-title" className="mt-3 font-display text-3xl tracking-[-0.04em] sm:text-4xl">Elige tu programa.</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-white/50">Compara duración, profundidad y contenido para encontrar el recorrido que buscas.</p>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
          {programs.map((program) => (
            <article key={program.id} aria-labelledby={`${program.id}-title`} className={`relative flex flex-col border p-5 sm:p-7 lg:p-8 ${program.featured ? "border-orange-300/45 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.14),transparent_55%),#101010]" : "border-white/10 bg-[#101010]"}`}>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">{program.label}</p>
                {program.featured && <span className="rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-orange-200 sm:text-[9px]">Programa principal</span>}
              </div>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <h3 id={`${program.id}-title`} className="min-w-0 font-display text-lg font-semibold leading-tight sm:text-xl lg:text-2xl">{program.name}</h3>
                <p className="shrink-0 text-right font-display text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-5xl">{program.months}<span className="ml-1 font-sans text-xs font-medium tracking-normal text-white/50">meses</span></p>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/65">{program.description}</p>

              <details className="academy-content-disclosure group mt-4 border-t border-white/10 pt-3">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-orange-200 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>Conocer el contenido</span>
                  <span aria-hidden="true" className="text-lg font-normal text-orange-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="grid gap-2 pb-2 pt-1 text-xs leading-5 text-white/60">
                  {program.content.map((item) => <li key={item} className="border-l border-orange-300/40 pl-3">{item}</li>)}
                </ul>
              </details>

              <PaymentSummary program={program} />
              <p className="mt-3 text-[10px] leading-4 text-white/45">Al continuar podrás elegir tu modalidad de pago en Gumroad.</p>
              <a href={program.gumroadUrl} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-bold transition-colors ${program.featured ? "bg-orange-500 text-black hover:bg-orange-400" : "border border-orange-300/50 text-orange-100 hover:bg-orange-300/10"}`}>
                Inscribirme <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
