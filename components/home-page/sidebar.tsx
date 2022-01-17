import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import HomeIcon from "../icons/home-icon";
import LibraryIcon from "../icons/library-icon";
import LogoutIcon from "../icons/logout-icon";
import SearchIcon from "../icons/search-icon";
import SpotifyIcon from "../icons/spotify-icon";

import classes from "./sidebar.module.css";

type playlist = {
  id: string;
  name: string;
};

const SideBar = () => {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState<Array<playlist>>([]);
  const { data: session, status } = useSession();

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
          <div id={playlist.id}>
            <button className={classes.option}>
              <p className={classes.playlist}>{playlist.name}</p>
            </button>
          </div>
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
