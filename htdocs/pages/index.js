import styles from "../styles/index.module.scss";
import GlitchTitle from "../components/glitchTitle";
import classNames from "classnames";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Home(props) {
  const wrap = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    if (props.hideAnimationDone) {
      tl.to(wrap.current, 1, {
        opacity: 0,
        ease: "expo.out",
      }).add(props.hideAnimationDone, 2);
    }

    return (e) => {
      tl.kill();
    };
  }, [props.hideAnimationDone]);
  return (
    <div
      className={classNames([
        styles.topWraper,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
      ref={wrap}
    >
      <div className={styles.profile}>
        <GlitchTitle title={"Yuki Okamura"} hide={props.hideAnimationDone} />
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
