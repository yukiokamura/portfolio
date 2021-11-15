import Top from "./index";
import Works from "./works";
import Contact from "./contact/";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const headInfo = {
  top: {
    title: "ykokmr",
  },
  works: {
    title: "WORKS | ykokmr",
  },
  contact: {
    title: "CONTACT | ykokmr",
  },
};

export default function Provider(props) {
  const [activeKey, setActiveKey] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const isActive = props.link.filter((item) => item.isActive);
    if (isActive.length) {
      setActiveKey(isActive[0].name);
      router.push(isActive[0].link);
    }
  }, [props.link]);
  return (
    <>
      {activeKey && activeKey in headInfo && (
        <Head>
          <title>{headInfo[activeKey].title}</title>
        </Head>
      )}

      <Top isActive={activeKey == "top"} />
      <Works isActive={activeKey == "works"} />
      <Contact isActive={activeKey == "contact"} />
    </>
  );
}
