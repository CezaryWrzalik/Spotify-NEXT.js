import { useRecoilState } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";
import { isPlayingState } from "../../atoms/songAtom";
import spotifyApi from "../../lib/spotify";
import { ArrowIcon, PauseIcon, PlayIcon } from "../icons";
import classes from "./controls.module.css";

const Controls = () => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const playlist = useRecoilState(playlistState);

	console.log(playlist)

  const handlePlayStop = () => {
    if (isPlaying) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={classes.controls}>
      <button style={{ transform: "rotate(180deg)" }}>
        <ArrowIcon />
      </button>
      <button onClick={() => handlePlayStop()} className={classes.play}>
        {!isPlaying ? <PlayIcon /> : <PauseIcon />}
      </button>
      <button>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default Controls;
