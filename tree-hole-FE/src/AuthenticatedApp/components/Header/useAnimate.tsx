import { useEffect } from "react";

export const useAnimate = (
  animateClass: "start" | "end",
  setAnimateClass: React.Dispatch<React.SetStateAction<"start" | "end">>
) => {
  let delay: number;
  let timeout: NodeJS.Timeout;
  const h1 = document.querySelector("h1");
  h1?.addEventListener("animationend", (event) => {
    if (
      event.target === document.querySelector("h1 span:last-child") ||
      event.target === document.querySelector("h1 span:first-child")
    ) {
      h1.classList.add("ended");
    } else {
      h1.classList.remove("ended");
    }
  });

  useEffect(() => {
    timeout = setTimeout(() => {
      document
        .querySelectorAll<HTMLSpanElement>(".font")
        .forEach((span: HTMLSpanElement) => {
          span.classList.remove("end");
          span.classList.add("start");
        });
      delay = 0;
      document
        .querySelectorAll<HTMLSpanElement>(".font")
        .forEach((span: HTMLSpanElement, index) => {
          delay += 0.1;
          if (index === 3) delay += 0.3;
          span.style.setProperty("--delay", `${delay}s`);
        });
      setAnimateClass("start");
    }, 0);
  }, []);
  useEffect(() => {
    timeout = setTimeout(() => {
      if (animateClass === "start") {
        document
          .querySelectorAll<HTMLSpanElement>(".font")
          .forEach((span: HTMLSpanElement) => {
            span.classList.remove("start");
            span.classList.add("end");
          });
        delay = 1;
        document
          .querySelectorAll<HTMLSpanElement>(".font")
          .forEach((span: HTMLSpanElement) => {
            delay -= 0.1;
            span.style.setProperty("--delay", `${delay}s`);
          });
        setAnimateClass("end");
      } else {
        document
          .querySelectorAll<HTMLSpanElement>(".font")
          .forEach((span: HTMLSpanElement) => {
            span.classList.remove("end");
            span.classList.add("start");
          });
        delay = 0;
        document
          .querySelectorAll<HTMLSpanElement>(".font")
          .forEach((span: HTMLSpanElement, index) => {
            delay += 0.1;
            if (index === 3) delay += 0.3;
            span.style.setProperty("--delay", `${delay}s`);
          });
        setAnimateClass("start");
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [animateClass]);
};

// return () => {
//
// };
