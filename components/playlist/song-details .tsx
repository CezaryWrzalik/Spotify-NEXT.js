import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "../../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../../lib/time";
import classes from "./song-details.module.css";

const SongDeails = (props: any) => {
  const { track } = props.track;
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    spotifyApi.play({
      uris: [track.uri],
    });
    setIsPlaying(true);
  };

  return (
    <div className={classes.flex} onClick={playSong}>
      <div className={classes.grid}>
        <p className={classes.index}>{props.i + 1}</p>
        <img src={track.album.images[0].url || null} alt=""></img>
        <p>{track.name}</p>
        <p>{track.artists[0].name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default SongDeails;
