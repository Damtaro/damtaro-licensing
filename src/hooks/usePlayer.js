import { useContext } from "react";
import PlayerContext from "../context/PlayerContextValue";

export default function usePlayer() {
  return useContext(PlayerContext);
}
