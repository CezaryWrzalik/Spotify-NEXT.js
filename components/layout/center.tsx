import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
import classes from "./center.module.css";
import Playlist from "../playlist/playlist";
import { shuffle } from "lodash";
import InstructionPage from "../instruction/instruction";

const PlaylistPage = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState);
  const [color, setColor] = useState<string>();
  const [rendered, setRendered] = useState(false);

  const [activeDevices, setActiveDevices] = useState(false);

  useEffect(() => {
    spotifyApi.getMyDevices().then((data) => {
      console.log(data);
      if (data.body.devices.length > 0) {
        setActiveDevices(true);
      }
    });
  }, [spotifyApi]);

  const colors = [
    " rgba(0, 212, 255, 1) 100%",
    " rgb(12, 207, 116) 100%",
    " rgb(165, 10, 185) 100%",
    " rgb(199, 196, 18) 100%",
    " rgb(199, 18, 48) 100%",
  ];

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
      setRendered(true);
    });
  }, [spotifyApi, playlistId]);

  console.log(activeDevices)

  if (!activeDevices) {
    return <InstructionPage />;
  }

  if (playlist === undefined)
    return <div className={classes.undefined}>Plalist not found</div>;

  if (rendered) {
    return (
      <div className={classes.playlistPage}>
        <div
          className={classes.header}
          style={{
            background: `linear-gradient(0deg,rgba(0, 36, 36, 0) 0%,${color} 100%)`,
          }}
        >
          {
            <img
              src={
                playlist.images[0]
                  ? playlist.images[0].url
                  : "./default-playlist.png"
              }
              alt=""
            />
          }
          <div>
            <h3>Playlist</h3>
            <div className={classes.playlistInfo}>{playlist.name}</div>
          </div>
        </div>

        <div className={classes.me}>
          <img src={session?.user.image} />
          <p>{session?.user.name}</p>
        </div>

        <Playlist playlist={playlist} />
      </div>
    );
  }

  return <div>Loading</div>;
};

export default PlaylistPage;
