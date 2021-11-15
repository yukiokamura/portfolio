import "../styles/globals.scss";
import GL from "../components/GL/";
import FPSStats from "react-fps-stats";
import Head from "next/head";
import Navigation from "../components/navigation";
import { useState } from "react";
import TextAnimation from "../components/textAnimation";
import styles from "../styles/home.module.scss";
const links = [
  {
    name: "top",
    link: "/",
    isActive: true,
  },

  {
    name: "works",
    link: "/works/",
    isActive: false,
  },
  {
    name: "contact",
    link: "/contact/",
    isActive: false,
  },
];
function MyApp({ Component, pageProps }) {
  const [link, setLink] = useState(links);
  return (
    <div className="wrapper">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <FPSStats />
      <GL link={link} />
      <Navigation
        links={link}
        onClickLink={(key) => {
          const newLink = link.map((item) => {
            item.isActive = item.name == key;
            return item;
          });

          setLink(newLink);
        }}
      />
      <Component {...pageProps} />
      <TextAnimation text="copyright 2021 ykokmr" className={[styles.footer]} />
    </div>
  );
}

export default MyApp;
