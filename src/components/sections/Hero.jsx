import Container from "../ui/Container";
import heroImage from "../../assets/hero.png";

export default function Hero({ onNavigate }) {
  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden"
    >

      {/* Hero Photography */}
      <div className="absolute inset-0 -z-20">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-[62%_center]"
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/55 to-black/70" />

      {/* Subtle Warm Tone */}
      <div className="absolute inset-0 -z-10 bg-orange-950/5" />

      {/* Hero Content */}
      <Container>
        <div className="relative flex min-h-screen items-end justify-center pb-24 pt-48 sm:pb-28 md:pb-32">

          <div className="mx-auto w-full max-w-4xl text-center">

            {/* Main Statement */}
            <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-[46px]">
              Music for Your Next Project.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white sm:text-lg">Original electronic music for creators, brands and visual storytelling.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => onNavigate("music")} className="min-h-12 rounded-xl bg-orange-500 px-6 py-3 font-bold text-black hover:bg-orange-400">Explore Music</button>
              <button type="button" onClick={() => onNavigate("how-to-use")} className="min-h-12 rounded-xl border border-white/30 bg-black/40 px-6 py-3 font-semibold text-white hover:bg-black/60">How Licensing Works</button>
            </div>

            {/* Music Genres */}
            <p className="mx-auto mt-6 max-w-4xl font-sans text-[8px] font-medium uppercase leading-5 tracking-[0.18em] text-white/80 sm:text-[9px] md:text-[10px]">
              Future Bass
              <span className="mx-2 text-white/50">•</span>
              Modern Disco
              <span className="mx-2 text-white/50">•</span>
              Slap House
              <span className="mx-2 text-white/50">•</span>
              House
              <span className="mx-2 text-white/50">•</span>
              Deep House
              <span className="mx-2 text-white/50">•</span>
              Melodic Drum &amp; Bass
              <span className="mx-2 text-white/50">•</span>
              Electro House
            </p>

          </div>

        </div>
      </Container>

    </section>
  );
}
