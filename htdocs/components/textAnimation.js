import styles from "../styles/textAnimation.module.scss";
import classnames from "classnames";
import { useEffect, useRef } from "react";

const alphabet = "-abcdefghijklmnopqrstuvwxyz0123456789";
const alphabetList = alphabet.split("");
export default function TextAnimation(props) {
  const textEl = useRef(null);
  const text = props.text.split("");
  const _text = text.map((e, i) => (e == " " ? " " : alphabetList[0]));
  const isComp = _text.map((e) => false);

  useEffect(() => {
    const el = textEl.current;
    const spans = el.querySelectorAll("span");
    let frame = 0;
    const interval = setInterval((e) => {
      ++frame;
      if (isComp.filter((t) => t).length == isComp.length)
        clearInterval(interval);
      spans.forEach((span, i) => {
        if (i != 0 && frame < i * 3) return;
        const t = span.innerText;
        if (t == text[i]) {
          isComp[i] = true;
          return;
        }
        if (t == " ") return;
        const index = alphabetList.indexOf(t);
        span.innerText = alphabetList[index + 1];
      });
    }, 2);
  }, []);
  return (
    <div>
      <p
        className={classnames([styles.textAnimatoin, ...props.className])}
        ref={textEl}
      >
        {_text.map((t, i) => {
          return <span key={i}>{t}</span>;
        })}
      </p>
    </div>
  );
}
