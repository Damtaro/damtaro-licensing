import Container from "../ui/Container";
import heroImage from "../../assets/hero.png";

export default function Hero() {
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/35" />

      {/* Subtle Warm Tone */}
      <div className="absolute inset-0 -z-10 bg-orange-950/5" />

      {/* Hero Content */}
      <Container>
        <div className="relative flex min-h-screen items-end justify-center pb-24 pt-48 sm:pb-28 md:pb-32">

          <div className="mx-auto w-full max-w-4xl text-center">

            {/* Main Statement */}
            <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-[46px]">
              premium music for your next project
            </h1>

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
