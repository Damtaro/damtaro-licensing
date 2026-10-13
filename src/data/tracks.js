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
import crazyCover from "../assets/covers/crazy.jpg";
import gravityCover from "../assets/covers/gravity.jpg";
import regainCover from "../assets/covers/regain.jpg";
import titanCover from "../assets/covers/titan.jpg";
import crazyAudio from "../assets/audio/crazy.mp3";
import gravityAudio from "../assets/audio/gravity.mp3";
import regainAudio from "../assets/audio/regain.mp3";
import titanAudio from "../assets/audio/titan.mp3";

const tracks = [

  {
    id: 4,
    title: "FEEL AGAIN",
    smartlinkUrl: "https://push.fm/fl/43trjtxw",
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
    smartlinkUrl: "https://push.fm/fl/qzfsxadb",
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
    smartlinkUrl: "https://push.fm/fl/522p2z4e",
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
    smartlinkUrl: "https://push.fm/fl/camai58z",
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
    smartlinkUrl: "https://push.fm/fl/f055lrzw",
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

  {
    id: 6,
    title: "CRAZY",
    artist: "DAMTARO",
    genre: "Melodic Drum & Bass",
    bpm: 85,
    primaryMood: "Uplifting",
    mood: ["Uplifting"],
    releaseDate: "2026-10-02",
    duration: "2:17",
    smartlinkUrl: "https://push.fm/fl/xmgmxpqs",
    releaseReady: true,
    cover: crazyCover,
    preview: crazyAudio,
  },
  {
    id: 7,
    title: "GRAVITY",
    artist: "DAMTARO",
    genre: "Melodic Drum & Bass",
    bpm: 85,
    primaryMood: "Hype",
    mood: ["Hype", "Energetic"],
    releaseDate: "2026-10-06",
    duration: "2:23",
    smartlinkUrl: "https://push.fm/fl/rddiiwzb",
    releaseReady: true,
    cover: gravityCover,
    preview: gravityAudio,
  },
  {
    id: 8,
    title: "REGAIN",
    artist: "DAMTARO",
    genre: "Melodic Drum & Bass",
    bpm: 90,
    primaryMood: "Uplifting",
    mood: ["Uplifting", "Energetic"],
    releaseDate: "2026-10-09",
    duration: "2:05",
    smartlinkUrl: "https://push.fm/fl/kiq1kuru",
    releaseReady: true,
    cover: regainCover,
    preview: regainAudio,
  },
  {
    id: 9,
    title: "TITAN",
    artist: "DAMTARO",
    genre: "Melodic Drum & Bass",
    bpm: 150,
    primaryMood: "Relaxing",
    mood: ["Relaxing", "Uplifting"],
    releaseDate: "2026-10-13",
    duration: "2:02",
    smartlinkUrl: "https://push.fm/fl/yknvvqxz",
    releaseReady: true,
    cover: titanCover,
    preview: titanAudio,
  },
];

// ISO dates sort newest-first; unknown dates retain the legacy order above.
// Sort a copy so the source catalog is never mutated.
export default [...tracks].sort((a, b) =>
  (b.releaseDate ?? "").localeCompare(a.releaseDate ?? "")
);
