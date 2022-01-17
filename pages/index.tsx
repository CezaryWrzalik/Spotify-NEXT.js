import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import HomePage from "../components/home-page/hero";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
