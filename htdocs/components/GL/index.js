import { useCallback, useEffect, useRef } from "react";
import styles from "../../styles/gl.module.scss";
import Controller from "./js/contoller";
import { useAnimationFrame } from "../../customState/useAnimationFrame";

export default function GL(props) {
  const canvas = useRef(null);
  const controller = useRef(null);

  useEffect(() => {
    let active;
    props.link.forEach((link) => {
      if (link.isActive) active = link.name;
    });
    if (controller.current) controller.current.changePage(active);
  }, [props.link]);

  const cb = useCallback(({ contentRect }) => {
    if (controller.current)
      controller.current.onResize(contentRect.width, contentRect.height);
  });

  useEffect(() => {
    controller.current = new Controller(canvas.current);
    const observer = new ResizeObserver(([entry]) => {
      cb(entry);
    });
    observer.observe(canvas.current);
    return () => {
      observer.disconnect();
      controller.current.destroy.bind(controller.current);
    };
  }, []);

  useAnimationFrame(() => {
    if (controller.current) controller.current.update();
  });

  return (
    <div ref={canvas} className={styles.canvas}>
      <canvas></canvas>
    </div>
  );
}
