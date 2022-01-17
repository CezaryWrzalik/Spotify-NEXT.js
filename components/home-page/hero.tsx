import SideBar from "./sidebar";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <div className={classes.layout}>
      <SideBar />
    </div>
  );
};

export default Hero;
