import { useEffect, useRef } from "react";
import styles from "../../styles/gl.module.scss";
import Controller from "./js/contoller";
export default function GL() {
  const canvas = useRef(null);
  useEffect(() => {
    const controller = new Controller(canvas.current);

    return controller.destroy.bind(controller);
  }, []);
  return (
    <div ref={canvas} className={styles.canvas}>
      <canvas></canvas>
    </div>
  );
}
