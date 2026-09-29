import blindCover from "../assets/covers/blind.webp";
import controlCover from "../assets/covers/control.webp";
import elevationCover from "../assets/covers/elevation.webp";

import blindAudio from "../assets/audio/blind.mp3";
import controlAudio from "../assets/audio/control.mp3";
import elevationAudio from "../assets/audio/elevation.mp3";
import feelAgainCover from "../assets/covers/feel-again.webp";
import feelAgainAudio from "../assets/audio/feel-again.mp3";
import ctrlMeCover from "../assets/covers/CTRL ME.png";
import ctrlMeAudio from "../assets/audio/Damtaro - CTRL ME.mp3";

const tracks = [

  {
    id: 4,
    title: "FEEL AGAIN",
    releaseDate: null,
    artist: "DAMTARO",
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Drum n Bass",
    bpm: 90,
    key: "C# Major",
    mood: "Emotional",
    cover: feelAgainCover,
    preview: feelAgainAudio,
    duration: "2:14",
  },

  {
    id: 1,
    title: "BLIND",
    releaseDate: null,
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Future Bass",
    bpm: 150,
    mood: "Epic",

    cover: blindCover,
    preview: blindAudio,

    duration: "2:33",
  },

  {
    id: 2,
    title: "CONTROL",
    releaseDate: null,
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Melodic Dubstep",
    bpm: 145,
    mood: "Dark",

    cover: controlCover,
    preview: controlAudio,

    duration: "3:07",
  },

  {
    id: 3,
    title: "ELEVATION",
    releaseDate: null,
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Bass House",
    bpm: 128,
    mood: "Aggressive",

    cover: elevationCover,
    preview: elevationAudio,

    duration: "2:24",
  },

  {
    id: 5,
    title: "CTRL ME",
    releaseDate: "2026-09-29",
    artist: "DAMTARO",
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Melodic Drum & Bass",
    bpm: 86,
    key: "Bb Major",
    mood: ["Energetic", "Uplifting", "Hype"],
    primaryMood: "Uplifting",
    potentialUses: ["Sports", "Action", "Gaming", "Vlog", "Travel", "Movie"],
    description: "CTRL ME is a euphoric and energetic Melodic Drum & Bass track built around a catchy, smooth melody, uplifting vocals, emotional elements and a strong sense of movement.",

    cover: ctrlMeCover,
    preview: ctrlMeAudio,
    duration: "2:53",
  },

];

// ISO dates sort newest-first; unknown dates retain the legacy order above.
// Sort a copy so the source catalog is never mutated.
export default [...tracks].sort((a, b) =>
  (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")
);
