import "../styles/globals.scss";
import GL from "../components/GL/";
import FPSStats from "react-fps-stats";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
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
      <GL />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
