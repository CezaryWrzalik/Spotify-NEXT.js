import Image from "next/image";
import FormButton from "../ui/form-button";
import SpotifyIcon from "../icons/spotify-icon";

import classes from "./auth.module.css";

const AuthLayout = () => {
  return (
    <section className={classes.layout}>
      <header className={classes.header}>        
         <SpotifyIcon />
        <h1>Spotify</h1>
      </header>
      <div className={classes.login}>
        <div>
          <FormButton
            provider="spotify"
            color="black"
            background="var(--main-color-2)"
          >
            <p>Kontynuuj z Spotify</p>
          </FormButton>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
