import { useEffect, useRef } from "react";
import { LEGAL_LAST_UPDATED } from "../data/legalDocuments";

export default function LegalInformation({ document, onNavigate, onReturn, returnLabel }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <article aria-labelledby="legal-title" className="bg-[#0b0b0b] px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
            Legal information
          </p>
          <h1 ref={headingRef} tabIndex={-1} id="legal-title" className="mt-4 rounded-sm font-display text-3xl font-medium leading-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 sm:text-5xl">
            {document.title}
          </h1>
          <p className="mt-5 border-l-2 border-orange-400/60 pl-4 text-base leading-7 text-zinc-300">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>
          {onReturn && (
            <button type="button" onClick={onReturn} className="mt-4 min-h-11 rounded-lg border border-orange-400/30 px-4 py-2 text-sm text-orange-400">
              {returnLabel}
            </button>
          )}
        </header>

        <div className="mt-8 divide-y divide-white/10">
          {document.sections.map(({ heading, paragraphs, items, contact }, index) => (
            <section key={heading} aria-labelledby={`legal-section-${index}`} className="py-5">
              <h2 id={`legal-section-${index}`} className="font-display text-xl font-medium leading-7 text-zinc-100">
                {heading}
              </h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-7 text-zinc-300">{paragraph}</p>
              ))}
              {items && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-zinc-300">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {contact && (
                <button type="button" onClick={() => onNavigate("contact")} className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-orange-400/30 px-4 py-2 text-sm font-medium text-orange-400 hover:bg-orange-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
                  Contact DAMTARO
                </button>
              )}
            </section>
          ))}
        </div>
        {onReturn && (
          <button type="button" onClick={onReturn} className="mt-6 min-h-11 rounded-lg border border-orange-400/30 px-4 py-2 text-sm text-orange-400">
            {returnLabel}
          </button>
        )}
      </div>
    </article>
  );
}
