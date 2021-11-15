import Head from "next/head";
import classNames from "classnames";
import styles from "../../styles/works.module.scss";
export default function Works(props) {
  return (
    <div
      className={classNames([
        styles.worksWrapper,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
    />
  );
}
