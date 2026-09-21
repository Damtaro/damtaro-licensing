import usePlayer from "../../hooks/usePlayer";

export default function AudioPlayer({ track, secondaryAction }) {
  const { currentTrack, playing, play, progress, currentTime, duration, formatTime, seek } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;
  const isPlaying = isCurrent && playing;

  return (
    <div className="audio-player w-full">
      <div className={secondaryAction ? "grid grid-cols-2 items-start gap-2" : undefined}>
      <button onClick={() => play(track)} className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl border px-2 text-sm font-medium transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.07] hover:text-white ${isPlaying ? "border-orange-500/30 bg-orange-500/[0.07] text-orange-400" : "border-white/[0.06] bg-white/[0.03] text-zinc-300"}`}>
        {isPlaying ? <><span aria-hidden="true">&#10074;&#10074;</span><span>Pause</span></> : <><span aria-hidden="true">&#9654;</span><span>Preview</span></>}
      </button>
      {secondaryAction}
      </div>

      <div className="audio-controls" data-expanded={isPlaying} aria-hidden={!isPlaying} inert={!isPlaying}>
        <div className="min-h-0 overflow-hidden">
        <div className="px-1 pt-1 pb-1">
          <input type="range" min="0" max="100" step="0.1" value={progress} onChange={(event) => seek(Number(event.target.value))} aria-label={`Seek ${track.title}`} aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`} className="audio-seek block w-full" style={{ "--seek-fill": `calc(${progress}% + ${8 - progress * 0.16}px)` }} />
          <div className="text-xs leading-4 text-zinc-500">
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
