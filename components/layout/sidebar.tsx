import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import classes from "./sidebar.module.css";
import {
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  SearchIcon,
  SpotifyIcon,
} from "../icons";
import { useRecoilState } from "recoil";
import { playlistIdState} from "../../atoms/playlistAtom";

const SideBar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<Array<any>>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [spotifyApi, session]);

  return (
    <div className={classes.sideBar}>
      <div className={classes.options}>
        <div className={classes.title}>
          <SpotifyIcon x={35} y={35} />
          <h2 className={classes.title}>Spotify</h2>
        </div>
        <div className={classes.menu}>
          <button className={classes.option}>
            <HomeIcon />
            <p>Home</p>
          </button>
          <button className={classes.option}>
            <SearchIcon />
            <p>Search</p>
          </button>
          <button className={classes.option}>
            <LibraryIcon />
            <p>Library</p>
          </button>
        </div>
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            className={classes.option}
            onClick={() => setPlaylistId(playlist.id)}
          >
            <p className={classes.playlist}>{playlist.name}</p>
          </button>
        ))}
      </div>
      <div className={classes.options}>
        <button onClick={() => signOut()}>
          <div className={classes.option}>
            <LogoutIcon />
            <p>Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
