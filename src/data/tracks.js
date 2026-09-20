import blindCover from "../assets/covers/blind.png";
import controlCover from "../assets/covers/control.png";
import elevationCover from "../assets/covers/elevation.png";

import blindAudio from "../assets/audio/blind.mp3";
import controlAudio from "../assets/audio/control.mp3";
import elevationAudio from "../assets/audio/elevation.mp3";

const tracks = [

  {
    id: 1,
    title: "BLIND",
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
    genre: "Bass House",
    bpm: 128,
    mood: "Aggressive",

    cover: elevationCover,
    preview: elevationAudio,

    duration: "3:07",
  },

];

export default tracks;