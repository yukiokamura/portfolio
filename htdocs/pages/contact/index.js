import GlitchTitle from "../../components/glitchTitle";
import Head from "next/head";
import styles from "../../styles/contact.module.scss";
import classNames from "classnames";
export default function Contact(props) {
  return (
    <div
      className={classNames([
        styles.wrap,
        {
          [styles.isActive]: props.isActive,
        },
      ])}
    >
      <div className={styles.wrapInner}>
        <GlitchTitle title={"contact"} />

        <div className={styles.contact}>
          <a>github</a>
          <a>twitter</a>
          <a>mail</a>
        </div>
      </div>
    </div>
  );
}
