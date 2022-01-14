import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import SideBar from "../components/layout/sidebar";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default Home;
