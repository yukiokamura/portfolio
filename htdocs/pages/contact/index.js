import GlitchTitle from "../../components/glitchTitle";
import Head from "next/head";
import styles from "../../styles/contact.module.scss";
import classNames from "classnames";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function Contact(props) {
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
        styles.wrap,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
      ref={wrap}
    >
      <div className={styles.wrapInner}>
        <GlitchTitle title={"contact"} hide={props.hideAnimationDone} />

        <div className={styles.contact}>
          <a>github</a>
          <a>twitter</a>
          <a>mail</a>
        </div>
      </div>
    </div>
  );
}
