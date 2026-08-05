"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const SYMBOLS = "01{}[]<>/\\_+-=";

type ScrambleTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function ScrambleText({
  text,
  className,
  delay = 0,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let frame = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        frame += 1;
        const resolved = Math.floor(frame / 2.2);

        setDisplay(
          text
            .split("")
            .map((character, index) => {
              if (character === " ") return " ";
              if (index < resolved) return character;
              return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            })
            .join(""),
        );

        if (resolved >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          setDisplay(text);
        }
      }, 32);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [delay, reduceMotion, text]);

  return (
    <span aria-label={text} className={className}>
      <span aria-hidden="true">{reduceMotion ? text : display}</span>
    </span>
  );
}
