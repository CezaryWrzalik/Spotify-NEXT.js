import { useRecoilState } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";
import { isPlayingState } from "../../atoms/songAtom";
import spotifyApi from "../../lib/spotify";
import { ArrowIcon, PauseIcon, PlayIcon } from "../icons";
import classes from "./controls.module.css";

type propsType = {
  playPause: () => void;
}

const Controls = (props: propsType) => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playlist = useRecoilState(playlistState);

  return (
    <div className={classes.controls}>
      <button style={{ transform: "rotate(180deg)" }}>
        <ArrowIcon />
      </button>
      <button onClick={() => props.playPause()} className={classes.play}>
        {!isPlaying ? <PlayIcon /> : <PauseIcon />}
      </button>
      <button>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default Controls;
