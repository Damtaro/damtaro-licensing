import blindCover from "../assets/covers/blind.webp";
import controlCover from "../assets/covers/control.webp";
import elevationCover from "../assets/covers/elevation.webp";

import blindAudio from "../assets/audio/blind.mp3";
import controlAudio from "../assets/audio/control.mp3";
import elevationAudio from "../assets/audio/elevation.mp3";
import feelAgainCover from "../assets/covers/feel-again.webp";
import feelAgainAudio from "../assets/audio/feel-again.mp3";

const tracks = [

  {
    id: 1,
    title: "BLIND",
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Future Bass",
    bpm: 150,
    mood: "Epic",

    cover: blindCover,
    preview: blindAudio,

    duration: "3:07",
  },

  {
    id: 2,
    title: "CONTROL",
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
    streamingLinks: { spotify: "", youtube: "", appleMusic: "", deezer: "" },
    genre: "Bass House",
    bpm: 128,
    mood: "Aggressive",

    cover: elevationCover,
    preview: elevationAudio,

    duration: "3:07",
  },

  {
    id: 4,
    title: "FEEL AGAIN",
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

];

export default tracks;
