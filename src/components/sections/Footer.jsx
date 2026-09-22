import Container from "../ui/Container";
import { legalDocuments } from "../../data/legalDocuments";

const navigation = [
  { label: "Home", view: "home" },
  { label: "Music", view: "music" },
  { label: "How to Use", view: "how-to-use" },
  { label: "Sample Packs", view: "sample-packs" },
  { label: "Contact", view: "contact" },
];

// Add only owner-verified profile URLs. Missing URLs render non-interactive icons.
const socialPlatforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/5M4tbWb5P8liGHg6OTBkoU",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M6.5 9c3.8-1.1 7.8-.7 11 1.1M7.2 12c3.1-.9 6.6-.5 9.2 1M8 15c2.6-.6 5.1-.3 7.4.9" fill="none" stroke="#0b0b0b" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Damtaromusic?sub_confirmation=1",
    icon: <path fill="currentColor" fillRule="evenodd" d="M21.6 6.2c-.2-.9-.9-1.6-1.8-1.8C18.2 4 12 4 12 4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 7.8 2 12 2 12s0 4.2.4 5.8c.2.9.9 1.6 1.8 1.8C5.8 20 12 20 12 20s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5.8.4-5.8s0-4.2-.4-5.8ZM10 8.5v7l6-3.5-6-3.5Z" clipRule="evenodd" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/damtaro_music/",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </g>
    ),
  },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0b0b0b]">
      <Container>
        <div className="flex flex-col gap-5 py-7 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-9">
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold tracking-[0.12em] text-zinc-100">
              DAMTARO
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              Music for creators, brands and visual experiences.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {socialPlatforms.map(({ name, url, icon }) => {
                const label = `DAMTARO on ${name}`;
                const artwork = (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
                    {icon}
                  </svg>
                );

                return url ? (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-orange-400 hover:bg-orange-400/10 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
                    {artwork}
                  </a>
                ) : (
                  <span key={name} role="img" aria-label={label} title={`${label} — official link not yet available`} className="inline-flex h-11 w-11 items-center justify-center text-orange-400">
                    {artwork}
                  </span>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-2 gap-y-1 lg:shrink-0 lg:gap-x-3">
            {navigation.map(({ label, view }) => (
              <button
                key={view}
                type="button"
                onClick={() => onNavigate(view)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-zinc-400">
            © 2026 DAMTARO. All rights reserved.
          </p>
          <nav aria-label="Legal information" className="flex flex-wrap gap-x-2 gap-y-1">
            {Object.entries(legalDocuments).map(([view, { title }]) => (
              <button
                key={view}
                type="button"
                onClick={() => onNavigate(view)}
                className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-xs text-zinc-400 hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {title}
              </button>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
