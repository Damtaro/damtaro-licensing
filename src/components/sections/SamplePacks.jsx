import { useEffect, useRef } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function SamplePacks({ onNavigate }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section aria-labelledby="sample-packs-title" className="flex min-h-screen items-center bg-[#0b0b0b] pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-400">
            SAMPLE PACKS
          </p>
          <h1 ref={headingRef} tabIndex={-1} id="sample-packs-title" className="mt-5 rounded-sm font-display text-4xl font-medium leading-tight tracking-[-0.025em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 sm:text-6xl lg:text-7xl">
            Coming Soon
          </h1>
          <div aria-hidden="true" className="mx-auto my-6 h-px w-12 bg-orange-400/60" />
          <p className="mx-auto max-w-lg text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
            We’re building a new collection of sounds for producers and creators.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            DAMTARO Sample Packs are currently in development.
          </p>
          <Button onClick={() => onNavigate("music")} className="mt-8 motion-reduce:transition-none">
            Explore Music
          </Button>
        </div>
      </Container>
    </section>
  );
}
