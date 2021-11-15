import styles from "../styles/navigation.module.scss";
import classNames from "classnames";
export default function Navigation(props) {
  return (
    <div className={styles.navigation}>
      {props.links.map((item, i) => {
        return (
          <div
            className={styles.navigationItem}
            key={"navi" + i}
            onClick={(e) => {
              props.onClickLink(item.name);
            }}
          >
            <div className={styles.name}>
              {item.name.split("").map((t, u) => {
                return (
                  <div
                    key={"nabiname" + u}
                    style={{ "transition-delay": u * 0.05 + "s" }}
                  >
                    <span>{t}</span>
                  </div>
                );
              })}
            </div>
            <div
              className={classNames([
                styles.boxs,
                {
                  [styles["is-active"]]: item.isActive,
                },
              ])}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
