import Container from "../ui/Container";
import youtubeSocial from "../../assets/how-to-use/youtube-social.webp";
import podcastsBroadcast from "../../assets/how-to-use/podcasts-broadcast.webp";
import onlineAdvertising from "../../assets/how-to-use/online-advertising.webp";
import corporateEducational from "../../assets/how-to-use/corporate-educational.webp";
import indieGamesApps from "../../assets/how-to-use/indie-games-apps.webp";
import filmsShortFilms from "../../assets/how-to-use/films-short-films.webp";
import digitalContent from "../../assets/how-to-use/digital-content.webp";
import commercialProjects from "../../assets/how-to-use/commercial-projects.webp";

const projectTypes = [
  { title: "YouTube & Social Media", image: youtubeSocial },
  { title: "Podcasts & Broadcast", image: podcastsBroadcast },
  { title: "Online Advertising", image: onlineAdvertising },
  { title: "Corporate & Educational", image: corporateEducational },
  { title: "Indie Games & Apps", image: indieGamesApps },
  { title: "Films & Short Films", image: filmsShortFilms },
  { title: "Digital Content", image: digitalContent },
  { title: "Commercial Projects", image: commercialProjects },
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

const primaryAction = "inline-flex min-h-11 items-center justify-center gap-3 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 motion-reduce:transition-none";

export default function HowToUse({ onNavigate }) {
  return (
    <section
      id="how-to-use"
      aria-labelledby="how-to-use-title"
      className="bg-[#0b0b0b] pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      <Container>

        {/* Main Header */}
        <div className="relative mx-auto max-w-3xl text-center">

          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            How to Use
          </p>

          <h1 id="how-to-use-title" className="mt-4 text-balance font-display text-4xl font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            Music made to move
            <br className="hidden sm:block" />{" "}
            with your project.
          </h1>

          <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-7 text-zinc-400">
            Find the right music for what you are creating, choose the right
            license, and move forward with confidence.
          </p>
          <button type="button" onClick={() => onNavigate("music")} className={`${primaryAction} mt-6`}>
            Explore Music <span aria-hidden="true">&rarr;</span>
          </button>

        </div>

        {/* =========================================================
            BLOCK 1 — WHAT CAN YOU USE DAMTARO MUSIC FOR?
        ========================================================== */}

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">

          <div className="mb-6">

            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">
              Explore by project
            </p>

            <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
              What are you creating?
            </h2>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-zinc-400">
              DAMTARO music can support different types of content, stories,
              brands and creative experiences.
            </p>

          </div>

          {/* Project Types */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {projectTypes.map((project, index) => (
              <li
                key={project.title}
                className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212] shadow-sm shadow-black/20 transition-colors hover:border-orange-500/25 motion-reduce:transition-none"
              >
                <div className="relative m-2 mb-0 h-16 overflow-hidden rounded-xl bg-[#191919] sm:h-20">
                  <img
                    src={project.image}
                    alt=""
                    width={960}
                    height={540}
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
                  <h3 className="text-sm font-semibold leading-5 text-zinc-100">
                    {project.title}
                  </h3>
                  <span aria-hidden="true" className="shrink-0 text-orange-400">&rarr;</span>
                </div>
              </li>
            ))}

          </ul>

          {/* License Note */}
          <div className="mt-5 border-l-2 border-orange-500/50 pl-4">

            <p className="font-sans text-sm leading-6 text-zinc-400">
              Your license determines how the music can be used. Always choose
              the license that matches your project and intended use.
            </p>

          </div>

        </div>

        {/* =========================================================
            BLOCK 2 — HOW LICENSING WORKS
        ========================================================== */}

        <div className="mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">

          <div className="mb-6 max-w-2xl">

            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">
              The licensing process
            </p>

            <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.02em] text-white sm:text-4xl">
              How licensing works.
            </h2>

            <p className="mt-3 font-sans text-sm leading-6 text-zinc-400">
              A simple path from discovering the right sound to securing the
              rights for your project.
            </p>

          </div>

          {/* Process */}
          <div className="relative">

            {/* Connecting Line */}
            <div aria-hidden="true" className="absolute left-4 top-4 bottom-4 w-px bg-white/10 sm:hidden lg:bottom-auto lg:left-4 lg:right-4 lg:block lg:h-px lg:w-auto" />

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">

              {licensingSteps.map((step) => (
                <li
                  key={step.number}
                  className="relative grid min-w-0 grid-cols-[2rem_1fr] gap-x-3 sm:block"
                >

                  {/* Number */}
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/30 bg-[#19130f] font-sans text-xs font-bold text-orange-400">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 sm:mt-3">

                    <h3 className="font-display text-xl font-medium leading-8 text-white">
                      {step.title}
                    </h3>

                    <p className="mt-1 font-sans text-sm leading-6 text-zinc-400">
                      {step.description}
                    </p>

                  </div>

                </li>
              ))}

            </ol>

          </div>

        </div>

        {/* Final Message */}
        <div className="mx-auto mt-14 max-w-6xl rounded-2xl border border-white/[0.08] bg-[#121212] p-5 sm:mt-16 sm:p-7 lg:mt-20 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">

          <h2 className="text-balance font-display text-2xl font-medium leading-snug text-white">
            Not sure which license fits your project?
          </h2>

          <p className="mt-2 font-sans text-sm leading-6 text-zinc-400">
            Get in touch with DAMTARO and find the right path for your project.
          </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <button type="button" onClick={() => onNavigate("music")} className={primaryAction}>Explore Music <span aria-hidden="true">&rarr;</span></button>
            <button type="button" onClick={() => onNavigate("contact")} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 motion-reduce:transition-none">Contact Us</button>
          </div>

        </div>

      </Container>
    </section>
  );
}
