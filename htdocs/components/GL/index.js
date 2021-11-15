import { useEffect, useRef, useState } from "react";
import styles from "../../styles/gl.module.scss";
import Controller from "./js/contoller";
export default function GL(props) {
  const canvas = useRef(null);
  let controller = null;
  useEffect(() => {
    controller = new Controller(canvas.current);
    let active;
    props.link.forEach((link) => {
      if (link.isActive) active = link.name;
    });
    controller.changePage(active);
    return controller.destroy.bind(controller);
  }, [props.link]);

  // useEffect(() => {
  //   let active;
  //   props.link.forEach((link) => {
  //     if (link.isActive) active = link.name;
  //   });
  //   console.log(active, controller);
  //   controller.changePage(active);
  // }, [props.link]);

  return (
    <div ref={canvas} className={styles.canvas}>
      <canvas></canvas>
    </div>
  );
}
