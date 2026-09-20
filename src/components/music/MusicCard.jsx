import AudioPlayer from "./AudioPlayer";
import Button from "../ui/Button";

export default function MusicCard({ track, onLicense, onViewTrack }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="overflow-hidden">
        <img src={track.cover} alt={track.title} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">{track.title}</h3>
        <p className="mt-3 text-base text-zinc-400">{track.genre}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.bpm} BPM</span>
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.mood}</span>
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-white">{track.duration}</span>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <AudioPlayer track={track} />
          <Button variant="secondary" onClick={() => onViewTrack(track)} className="w-full">View Track</Button>
          <Button size="lg" onClick={() => onLicense(track)} className="mt-2 w-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 sm:col-span-2">License <span aria-hidden="true">&rarr;</span></Button>
        </div>
      </div>
    </article>
  );
}
