import SongDeails from "./song-details ";

import classes from "./playlist.module.css";
import { useEffect, useState } from "react";
import spotifyApi from "../../lib/spotify";
import InstructionPage from "../instruction/instruction";

const Playlist = (props: any) => {

  if (props.playlist.tracks.items.length === 0) {
    return (
      <div className={classes.content}>
        <p className={classes.errorMessage}>Playlist is empty</p>
      </div>
    );
  }

  return (
    <div className={classes.content}>
      {props.playlist?.tracks.items.map((track: Object, i: number) => (
        <SongDeails key={i} track={track} i={i} />
      ))}
    </div>
  );
};

export default Playlist;
