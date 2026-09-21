import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const platforms = {
  spotify: "Spotify",
  youtube: "YouTube",
  appleMusic: "Apple Music",
  deezer: "Deezer",
  soundCloud: "SoundCloud",
  tidal: "Tidal",
  amazonMusic: "Amazon Music",
};

function isValidStreamingUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export default function StreamModal({ track, onClose }) {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const titleId = useId();
  const links = Object.entries(track.streamingLinks || {}).filter(
    ([platform, url]) => Object.hasOwn(platforms, platform) && isValidStreamingUrl(url)
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!isClosing) return;
    const timeout = window.setTimeout(onClose, 200);
    return () => window.clearTimeout(timeout);
  }, [isClosing, onClose]);

  function requestClose() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
    } else {
      setIsClosing(true);
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) requestClose(); }}
      data-closing={isClosing}
      className="stream-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-4 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="pointer-events-none flex min-h-full items-center justify-center">
        <section className="stream-panel pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto overscroll-contain rounded-3xl border border-white/[0.08] bg-[#101010] p-6 shadow-xl shadow-black/30">
          <button type="button" onClick={requestClose} aria-label="Close streaming options" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.03] text-2xl text-zinc-400 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white">&times;</button>
          <p className="pr-10 text-xs font-semibold uppercase tracking-widest text-orange-500">Streaming options</p>
          <h2 id={titleId} className="mt-3 break-words pr-10 text-2xl font-semibold tracking-tight">{track.title}</h2>
          {links.length > 0 ? (
            <div className="mt-5 grid gap-2">
              {links.map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${platforms[platform]} (opens in a new tab)`} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-orange-500/20 hover:bg-white/[0.07] hover:text-white">
                  {platforms[platform]}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ) : <p className="mt-5 text-sm leading-6 text-zinc-400">Streaming links coming soon.</p>}
        </section>
      </div>
    </dialog>,
    document.body
  );
}
