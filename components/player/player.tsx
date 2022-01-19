import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSonginfo";
import useSpotify from "../../hooks/useSpotify";
import { VolumeHighIcon, VolumeLowIcon } from "../icons";
import Controls from "./controls";
import classes from "./player.module.css";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<string>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo: any = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing: ", data.body.item);
        setCurrentTrackId(data?.body?.item!.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
          console.log(isPlaying);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  });

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div className={classes.player}>
      <div className={classes.songInfo}>
        <img src={songInfo?.album.images?.[0]?.url} alt=""></img>
        <div className={classes.about}>
          <p className={classes.title}>{songInfo?.name}</p>
          <p className={classes.artist}>{songInfo?.album.artists[0].name}</p>
        </div>
      </div>
      <div className={classes.controls}>
        <Controls />
      </div>
      <div className={classes.volume}>
        <VolumeLowIcon />
        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeHighIcon />
      </div>
    </div>
  );
};

export default Player;
