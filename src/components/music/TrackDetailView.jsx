import { useEffect } from "react";
import Button from "../ui/Button";
import AudioPlayer from "./AudioPlayer";

export default function TrackDetailView({ open, track, onClose, onLicense, suppressEscape = false }) {
  useEffect(() => {
    if (!open || suppressEscape) return undefined;

    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, open, suppressEscape]);

  if (!open || !track) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <section onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="track-detail-title" className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <button onClick={onClose} aria-label="Close track detail" className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition hover:bg-orange-500 hover:text-white">&times;</button>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <img src={track.cover} alt={track.title} className="aspect-square w-full rounded-2xl border border-zinc-800 object-cover" />

          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">Track detail</p>
            <h2 id="track-detail-title" className="mt-3 text-4xl font-black text-white sm:text-5xl">{track.title}</h2>
            <p className="mt-3 text-lg text-zinc-400">{track.genre}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.bpm} BPM</span>
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.mood}</span>
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.duration}</span>
            </div>

            <div className="mt-8"><AudioPlayer track={track} /></div>
            <Button onClick={() => onLicense(track)} className="mt-5 w-full">License this track</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
