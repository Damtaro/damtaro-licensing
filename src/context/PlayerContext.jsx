import { useEffect, useRef, useState } from "react";
import PlayerContext from "./PlayerContextValue";

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const currentTrackRef = useRef(null);
  const playRequestRef = useRef(0);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    function updateProgress() {
      const nextDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
      const nextTime = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;

      setCurrentTime(nextTime);
      setDuration(nextDuration);
      setProgress(nextDuration ? (nextTime / nextDuration) * 100 : 0);
    }

    function handleEnded() {
      audio.currentTime = 0;
      setPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    }

    function handlePause() {
      setPlaying(false);
    }

    function handlePlay() {
      setPlaying(true);
    }

    function handleError() {
      setPlaying(false);
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      playRequestRef.current += 1;
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("durationchange", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  function startPlayback(audio) {
    const requestId = ++playRequestRef.current;

    audio.play().catch(() => {
      if (playRequestRef.current === requestId) {
        setPlaying(false);
      }
    });
  }

  function play(track) {
    const audio = audioRef.current;

    if (!audio) return;

    if (currentTrackRef.current?.id === track.id) {
      if (audio.paused) {
        startPlayback(audio);
      } else {
        playRequestRef.current += 1;
        audio.pause();
      }

      return;
    }

    playRequestRef.current += 1;
    audio.pause();
    audio.src = track.preview;
    audio.load();

    currentTrackRef.current = track;
    setCurrentTrack(track);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);

    startPlayback(audio);
  }

  function seek(percent) {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;

    const clampedPercent = Math.min(100, Math.max(0, percent));
    audio.currentTime = (clampedPercent / 100) * audio.duration;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playing,
        play,
        seek,
        progress,
        currentTime,
        duration,
        formatTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
