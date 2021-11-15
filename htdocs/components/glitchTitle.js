import classNames from "classnames";
import styles from "../styles/glitchTitle.module.scss";
export default function GlitchTitle(props) {
  return (
    <h1
      className={classNames([
        styles.glitch,
        {
          [styles.isGlitchHide]: props.hide,
          [styles.isGlitch]: !props.hide,
        },
      ])}
    >
      {[...Array(4)].map((_, i) => {
        return <p key={"glitch" + i}>{props.title}</p>;
      })}
    </h1>
  );
}
