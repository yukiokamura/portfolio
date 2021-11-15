import styles from "../styles/glitchTitle.module.scss";
export default function GlitchTitle(props) {
  return (
    <h1 className={styles.glitch}>
      {[...Array(4)].map((_, i) => {
        return <p key={"glitch" + i}>{props.title}</p>;
      })}
    </h1>
  );
}
