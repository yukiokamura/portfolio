import styles from "../styles/index.module.scss";
import GlitchTitle from "../components/glitchTitle";
import classNames from "classnames";

export default function Home(props) {
  return (
    <div
      className={classNames([
        styles.topWraper,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
    >
      <div className={styles.profile}>
        <GlitchTitle title={"Yuki Okamura"} />
        <div className={styles.dis}>
          <p>I'm front developer.</p>
          <p>June 28th 1993</p>
          <p>LOVE : THREE.js / PIXI.js</p>
          <p>
            I've been working for{" "}
            <a href="https://balance.bz/" target="_blank">
              BALANCe,inc
            </a>{" "}
            since 2020.
          </p>
          <p>This site is made by THREE.js and Next.js</p>
        </div>
        <div className={styles.scroll}>
          <p>scroll</p>
          <div className={styles.scrollBars}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
