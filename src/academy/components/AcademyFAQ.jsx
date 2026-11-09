const questions = [
  {
    q: "¿Necesito experiencia previa en producción musical?",
    a: "Los requisitos de experiencia previa todavía están por confirmar. Se añadirán aquí cuando estén aprobados.",
  },
  {
    q: "¿Qué necesito para aprender con FL Studio?",
    a: "La formación se centra en FL Studio. La versión compatible y los requisitos del equipo están pendientes de confirmación.",
  },
  {
    q: "¿Cuánto dura cada programa?",
    a: "El Programa Intensivo dura cuatro meses. El Programa Integral dura siete meses.",
  },
  {
    q: "¿En qué se diferencian?",
    a: "El Intensivo ofrece formación acelerada y contenidos seleccionados, con menor profundidad y alcance. El Integral ofrece formación completa, contenidos desarrollados a detalle y mayor profundidad y práctica.",
  },
  {
    q: "¿Qué modalidades de pago habrá?",
    a: "Se contemplan pago completo y pago mensual. Los precios y detalles de cada modalidad se publicarán cuando estén definidos.",
  },
];

export default function AcademyFAQ() {
  return (
    <section id="preguntas" className="academy-section scroll-mt-28 border-t border-white/[0.07] py-14 sm:py-16" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
        <div>
          <p className="academy-eyebrow">Antes de elegir</p>
          <h2 id="faq-title" className="mt-3 font-display text-3xl tracking-[-0.04em] sm:text-4xl">Preguntas frecuentes.</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {questions.map(({ q, a }) => (
            <details key={q} className="group py-3.5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-left text-sm font-semibold text-white/85 marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <span aria-hidden="true" className="text-xl font-normal text-orange-300 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-1 pr-10 text-xs leading-6 text-white/50">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
