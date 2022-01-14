import classes from "./form-button.module.css";
import { signIn } from "next-auth/react";

type formButtonProps = {
  color?: string;
  background: string;
  children: JSX.Element;
  provider: string;
};

const FormButton = (props: formButtonProps) => {
  return (
    <button
      style={{ backgroundColor: props.background, color: props.color }}
      className={classes.button}
      onClick={() => signIn(props.provider, { callbackUrl: '/', redirect: false })}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
