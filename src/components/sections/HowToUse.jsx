import Container from "../ui/Container";

const projectTypes = [
  "YouTube & Social Media",
  "Podcasts & Broadcast",
  "Online Advertising",
  "Corporate & Educational",
  "Indie Games & Apps",
  "Films & Short Films",
  "Digital Content",
  "Commercial Projects",
];

const licensingSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore the DAMTARO catalog and find music that fits the creative direction of your project.",
  },
  {
    number: "02",
    title: "Select",
    description:
      "Choose the licensing option that matches your project and intended use.",
  },
  {
    number: "03",
    title: "Validate",
    description:
      "Confirm that the selected license covers the way you intend to use the music.",
  },
  {
    number: "04",
    title: "Purchase",
    description:
      "Complete the licensing process and secure the rights required for your project.",
  },
  {
    number: "05",
    title: "Post-sale",
    description:
      "Stay connected with DAMTARO for support and future licensing opportunities.",
  },
];

export default function HowToUse() {
  return (
    <section
      id="how-to-use"
      className="relative overflow-hidden bg-[#0b0b0b] py-28 md:py-36"
    >
      {/* Warm Ambient Light */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-950/10 blur-[160px]" />

      <Container>

        {/* Main Header */}
        <div className="relative mx-auto max-w-3xl text-center">

          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            How to Use
          </p>

          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl">
            Music made to move
            <br />
            with your project.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-7 text-white/60 md:text-lg">
            Find the right music for what you are creating, choose the right
            license, and move forward with confidence.
          </p>

        </div>

        {/* =========================================================
            BLOCK 1 — WHAT CAN YOU USE DAMTARO MUSIC FOR?
        ========================================================== */}

        <div className="relative mx-auto mt-24 max-w-6xl">

          <div className="mb-10">

            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-white/40">
              Explore by project
            </p>

            <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
              What are you creating?
            </h3>

            <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-white/50">
              DAMTARO music can support different types of content, stories,
              brands and creative experiences.
            </p>

          </div>

          {/* Project Types */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {projectTypes.map((project) => (
              <div
                key={project}
                className="group flex min-h-24 items-center border border-white/10 bg-white/[0.02] px-6 transition-colors duration-300 hover:border-orange-500/40 hover:bg-orange-500/[0.04]"
              >
                <div className="flex items-center gap-4">

                  <span className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                  <span className="font-sans text-sm font-bold text-white/85">
                    {project}
                  </span>

                </div>
              </div>
            ))}

          </div>

          {/* License Note */}
          <div className="mt-8 border-l border-orange-500/50 pl-5">

            <p className="font-sans text-sm leading-6 text-white/50">
              Your license determines how the music can be used. Always choose
              the license that matches your project and intended use.
            </p>

          </div>

        </div>

        {/* =========================================================
            BLOCK 2 — HOW LICENSING WORKS
        ========================================================== */}

        <div className="relative mx-auto mt-32 max-w-6xl">

          <div className="mb-14 max-w-2xl">

            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-white/40">
              The licensing process
            </p>

            <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
              How licensing works.
            </h3>

            <p className="mt-4 font-sans text-sm leading-6 text-white/50">
              A simple path from discovering the right sound to securing the
              rights for your project.
            </p>

          </div>

          {/* Process */}
          <div className="relative">

            {/* Connecting Line */}
            <div className="absolute left-[4%] right-[4%] top-4 hidden h-px bg-white/10 lg:block" />

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">

              {licensingSteps.map((step) => (
                <article
                  key={step.number}
                  className="group relative"
                >

                  {/* Number */}
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/60 bg-[#0b0b0b] font-sans text-[10px] font-bold tracking-wider text-orange-500 transition-all duration-300 group-hover:border-orange-400 group-hover:bg-orange-500 group-hover:text-black">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="mt-7">

                    <h4 className="font-display text-2xl font-medium text-white">
                      {step.title}
                    </h4>

                    <p className="mt-4 max-w-[230px] font-sans text-sm leading-6 text-white/50">
                      {step.description}
                    </p>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </div>

        {/* Final Message */}
        <div className="mx-auto mt-28 max-w-3xl text-center">

          <p className="font-display text-2xl font-medium leading-relaxed text-white/90 sm:text-3xl">
            Not sure which license fits your project?
          </p>

          <p className="mt-3 font-sans text-sm leading-6 text-white/50">
            Get in touch with DAMTARO and find the right path for your project.
          </p>

        </div>

      </Container>
    </section>
  );
}
