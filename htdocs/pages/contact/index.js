import GlitchTitle from "../../components/glitchTitle";
import Head from "next/head";
import styles from "../../styles/contact.module.scss";
export default function Contact() {
  return (
    <div className={styles.wrap}>
      <Head>
        <title>CONTACT | ykokmr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
