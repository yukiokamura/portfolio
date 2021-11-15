import Head from "next/head";
import classNames from "classnames";
import styles from "../../styles/works.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function Works(props) {
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
        styles.worksWrapper,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
      ref={wrap}
    />
  );
}
