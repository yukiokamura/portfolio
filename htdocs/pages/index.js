import Head from "next/head";
import TextAnimation from "../components/textAnimation";
import styles from "../styles/index.module.scss";
export default function Home() {
  return (
    <div>
      <Head>
        <title>ykokmr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TextAnimation text="copyright 2021 ykokmr" className={[styles.footer]} />
    </div>
  );
}
