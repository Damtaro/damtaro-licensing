import usePlayer from "../../hooks/usePlayer";

export default function AudioPlayer({ track }) {
  const { currentTrack, playing, play, progress, currentTime, duration, formatTime, seek } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;
  const isPlaying = isCurrent && playing;

  function handleSeek(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    seek(((event.clientX - rect.left) / rect.width) * 100);
  }

  return (
    <div className="w-full">
      <button onClick={() => play(track)} className="flex h-12 w-full items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-semibold text-white transition-all duration-200 hover:border-orange-500 hover:bg-zinc-800">
        {isPlaying ? <><span aria-hidden="true">&#10074;&#10074;</span> Pause</> : <><span aria-hidden="true">&#9654;</span> Preview</>}
      </button>

      {isCurrent && (
        <div className="mt-3">
          <div onClick={handleSeek} className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-800">
            <div className="absolute left-0 top-0 h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
