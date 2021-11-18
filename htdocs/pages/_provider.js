import Top from "./index";
import Works from "./works";
import Contact from "./contact/";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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

const getComp = (name, props) => {
  if (name == "top") return <Top {...props} />;
  if (name == "works") return <Works {...props} />;
  if (name == "contact") return <Contact {...props} />;
};

export default function Provider(props) {
  const [activeKey, setActiveKey] = useState(null);
  const [currentCompornent, setCurrentCompornent] = useState({
    comp: null,
    name: null,
  });
  const [prevCompornent, setPrevCompornent] = useState([]);

  const hideAnimationDone = (prop) => {
    console.log("delete!!!", prevCompornent);
    const newPrev = prevCompornent.filter((_, i) => i != 0);
    console.log(newPrev);
    setPrevCompornent(newPrev);
  };
  useEffect(() => {
    const isActive = props.link.filter((item) => item.isActive);
    if (isActive.length) {
      setActiveKey(isActive[0].name);
    }
  }, [props.link]);

  useEffect(() => {
    setCurrentCompornent({
      name: activeKey,
    });
  }, [activeKey]);

  useEffect(() => {
    if (currentCompornent.name) {
      const newPrev = prevCompornent.filter(
        (name) => name != currentCompornent.name
      );
      setPrevCompornent([...newPrev, currentCompornent.name]);
    }
  }, [currentCompornent]);

  return (
    <>
      {activeKey && activeKey in headInfo && (
        <Head>
          <title>{headInfo[activeKey].title}</title>
        </Head>
      )}
      {prevCompornent.map((name, i) => {
        return getComp(name, {
          isActive: true,
          hideAnimationDone:
            i == prevCompornent.length - 1 ? null : hideAnimationDone,
          key: "prevComp" + i,
        });
      })}
    </>
  );
}
