import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import StreamModal from "./StreamModal";
import Button from "../ui/Button";

export default function MusicCard({ track, onLicense, eagerArtwork = false }) {
  const [isStreamOpen, setIsStreamOpen] = useState(false);
  return (
    <article className="music-card group grid min-w-0 gap-y-0 overflow-hidden rounded-3xl border border-white/[0.06] bg-[#101010] shadow-sm shadow-black/20 transition-colors duration-200 hover:border-orange-500/20 focus-within:border-orange-500/25">
      <div className="px-4 pt-4">
        <img src={track.cover} alt={track.title} width={1200} height={1200} loading={eagerArtwork ? "eager" : "lazy"} decoding="async" className="h-44 w-full object-contain sm:h-48" />
      </div>

      <h3 className="px-4 pt-3 text-xl font-semibold leading-7 tracking-tight text-white">{track.title}</h3>
      <p className="px-4 pt-1 text-sm leading-5 text-zinc-400">{track.genre}</p>

      <div className="flex flex-wrap content-start gap-2 px-4 pt-2">
        <span className="rounded-full border border-white/[0.04] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400">{track.bpm} BPM</span>
        <span className="rounded-full border border-white/[0.04] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400">{track.mood}</span>
        <span className="rounded-full border border-white/[0.04] bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400">{track.duration}</span>
      </div>

      <div className="px-4 pt-3">
        <AudioPlayer track={track} secondaryAction={
          <Button variant="secondary" onClick={() => setIsStreamOpen(true)} aria-haspopup="dialog" className="min-h-11! w-full rounded-xl! border-white/[0.06]! bg-white/[0.03]! px-2! py-2! text-sm! font-medium! text-zinc-300! transition-colors! hover:border-white/15! hover:bg-white/[0.07]! hover:text-white!">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className="shrink-0">
              <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.503 17.307a.75.75 0 0 1-1.032.249c-2.826-1.727-6.383-2.118-10.572-1.161a.75.75 0 0 1-.334-1.462c4.584-1.048 8.516-.597 11.689 1.342a.75.75 0 0 1 .249 1.032Zm1.469-3.269a.938.938 0 0 1-1.29.308c-3.235-1.989-8.166-2.565-11.992-1.403a.938.938 0 0 1-.545-1.792c4.37-1.326 9.803-.683 13.519 1.6a.938.938 0 0 1 .308 1.287Zm.126-3.403c-3.879-2.304-10.278-2.516-13.982-1.392a1.125 1.125 0 0 1-.653-2.153c4.252-1.29 11.319-1.041 15.784 1.609a1.125 1.125 0 0 1-1.149 1.936Z" />
            </svg>
            Stream
          </Button>
        } />
      </div>
      <div className="px-4 pb-4 pt-2">
        <Button onClick={() => onLicense(track)} className="min-h-11! w-full gap-3! py-2! shadow-sm shadow-orange-500/10 transition-colors!">License <span aria-hidden="true">&rarr;</span></Button>
      </div>
      {isStreamOpen && <StreamModal track={track} onClose={() => setIsStreamOpen(false)} />}
    </article>
  );
}
