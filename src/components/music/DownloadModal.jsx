import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DownloadModal({ track, onClose, onReadTerms, onLicense }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const [copyStatus, setCopyStatus] = useState("");
  const credit = `Music: DAMTARO – ${track.title}`;
  const safeTitle = Array.from(track.title, (character) =>
    character.charCodeAt(0) < 32 || '<>:"/\\|?*'.includes(character) ? "-" : character
  ).join("");
  const filename = `DAMTARO - ${safeTitle}.mp3`;

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

  async function copyCredit() {
    try {
      await navigator.clipboard.writeText(credit);
      setCopyStatus("Credit copied!");
    } catch {
      setCopyStatus("Please select and copy the credit above.");
    }
  }

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-4 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm">
      <div className="pointer-events-none flex min-h-full items-center justify-center">
        <section className="pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto overscroll-contain rounded-3xl border border-white/[0.08] bg-[#101010] p-6 shadow-xl shadow-black/30">
          <button type="button" onClick={onClose} aria-label="Close download" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-zinc-400 hover:bg-white/[0.07] hover:text-white">&times;</button>
          <h2 id={titleId} className="pr-10 text-2xl font-semibold">Download &amp; Create 🎵</h2>
          <p className="mt-2 break-words font-medium text-orange-400">{track.title}</p>
          <p className="mt-5 text-sm leading-6 text-zinc-300">You’re welcome to use this track in your personal and non-commercial content.</p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">Just remember to credit DAMTARO so people can discover the music too. 😊</p>
          <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-xs font-semibold tracking-widest text-zinc-400">CREDIT</p>
            <p className="mt-2 select-text break-words text-sm">{credit}</p>
            <button type="button" onClick={copyCredit} className="mt-2 min-h-11 text-sm text-zinc-300 underline underline-offset-4 hover:text-white">Copy credit</button>
            <p role="status" className="text-xs text-zinc-400">{copyStatus}</p>
          </div>
          <p className="mt-4 text-xs leading-5 text-zinc-400">By downloading, you agree to our <button type="button" onClick={onReadTerms} className="inline-flex min-h-11 items-center text-zinc-200 underline underline-offset-4">Terms &amp; Conditions</button>.</p>
          <a href={track.preview} download={filename} className="mt-3 flex min-h-12 items-center justify-center rounded-2xl border border-orange-500 bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-400">Download MP3</a>
          <div className="mt-5 border-t border-white/[0.08] pt-4 text-center">
            <p className="text-sm text-zinc-400">Want to monetize it or use it commercially?</p>
            <button type="button" onClick={onLicense} className="mt-1 min-h-11 text-sm font-semibold text-zinc-200 hover:text-white">Get a License →</button>
          </div>
        </section>
      </div>
    </dialog>, document.body
  );
}
