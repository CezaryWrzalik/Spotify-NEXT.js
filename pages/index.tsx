import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import SideBar from "../components/layout/sidebar";
import PlaylistPage from "../components/layout/center";

import classes from "../styles/home.module.css";
import Player from "../components/player/player";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";

const Home = () => {
  const currentTrackId = useRecoilState(currentTrackIdState);

  return (
    <div>
      <div className={classes.layout}>
        <SideBar />
        <PlaylistPage />
      </div>
      {currentTrackId && <Player />}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
