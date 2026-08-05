"use client";

import { useId } from "react";

import { motion } from "motion/react";

import styles from "./AboutScrollytelling.module.css";

type AbstractIntelligenceProps = {
  reducedMotion: boolean;
};

function buildWavePath(
  lineIndex: number,
  lineCount: number,
) {
  const points: string[] = [];
  const samples = 22;
  const verticalOffset =
    (lineIndex - (lineCount - 1) / 2) * 7.2;

  for (
    let sample = 0;
    sample <= samples;
    sample += 1
  ) {
    const x = -80 + (1760 / samples) * sample;
    const ratio = sample / samples;

    const envelope = Math.pow(
      Math.sin(ratio * Math.PI),
      0.78,
    );

    const primary =
      Math.sin(ratio * Math.PI * 3.15) *
      108 *
      envelope;

    const secondary =
      Math.sin(
        ratio * Math.PI * 6.4 +
          lineIndex * 0.065,
      ) *
      25 *
      envelope;

    const y =
      470 +
      primary +
      secondary +
      verticalOffset * envelope;

    points.push(
      `${sample === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`,
    );
  }

  return points.join(" ");
}

export function AbstractIntelligence({
  reducedMotion,
}: AbstractIntelligenceProps) {
  const id = useId().replace(/:/g, "");
  const lineCount = 38;

  return (
    <svg
      aria-hidden="true"
      className={styles.intelligenceSvg}
      preserveAspectRatio="none"
      viewBox="0 0 1600 900"
    >
      <defs>
        <linearGradient
          id={`${id}-wave`}
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop
            offset="0"
            stopColor="#6370ff"
            stopOpacity="0"
          />
          <stop
            offset="0.24"
            stopColor="#809cff"
            stopOpacity="0.44"
          />
          <stop
            offset="0.52"
            stopColor="#efffff"
            stopOpacity="0.92"
          />
          <stop
            offset="0.77"
            stopColor="#92c2ff"
            stopOpacity="0.56"
          />
          <stop
            offset="1"
            stopColor="#745eff"
            stopOpacity="0"
          />
        </linearGradient>

        <filter
          height="180%"
          id={`${id}-fluid`}
          width="180%"
          x="-40%"
          y="-40%"
        >
          <feTurbulence
            baseFrequency="0.004 0.009"
            numOctaves="2"
            result="noise"
            seed="7"
            type="fractalNoise"
          >
            {!reducedMotion ? (
              <animate
                attributeName="baseFrequency"
                dur="14s"
                repeatCount="indefinite"
                values="
                  0.004 0.009;
                  0.007 0.005;
                  0.003 0.011;
                  0.004 0.009
                "
              />
            ) : null}
          </feTurbulence>

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="24"
            xChannelSelector="R"
            yChannelSelector="B"
          >
            {!reducedMotion ? (
              <animate
                attributeName="scale"
                dur="9s"
                repeatCount="indefinite"
                values="18;30;21;18"
              />
            ) : null}
          </feDisplacementMap>

          <feGaussianBlur
            stdDeviation="0.22"
          />
        </filter>

        <filter
          height="180%"
          id={`${id}-glow`}
          width="180%"
          x="-40%"
          y="-40%"
        >
          <feGaussianBlur
            result="blur"
            stdDeviation="2.8"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient
          id={`${id}-halo`}
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0"
            stopColor="#dffcff"
            stopOpacity="0.16"
          />
          <stop
            offset="1"
            stopColor="#dffcff"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <ellipse
        cx="810"
        cy="470"
        fill={`url(#${id}-halo)`}
        rx="560"
        ry="280"
      />

      <motion.g
        animate={
          reducedMotion
            ? undefined
            : {
                x: [-12, 10, -12],
                y: [-5, 6, -5],
              }
        }
        filter={`url(#${id}-fluid)`}
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: reducedMotion ? 0 : Infinity,
        }}
      >
        {Array.from({
          length: lineCount,
        }).map((_, index) => {
          const distance =
            Math.abs(
              index -
                (lineCount - 1) / 2,
            ) /
            ((lineCount - 1) / 2);

          const opacity =
            0.055 +
            (1 - distance) * 0.16;

          return (
            <motion.path
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [
                        opacity * 0.68,
                        opacity,
                        opacity * 0.68,
                      ],
                      pathLength: [
                        0.91,
                        1,
                        0.91,
                      ],
                    }
              }
              d={buildWavePath(
                index,
                lineCount,
              )}
              fill="none"
              filter={`url(#${id}-glow)`}
              key={index}
              stroke={`url(#${id}-wave)`}
              strokeLinecap="round"
              strokeWidth={
                index % 7 === 0
                  ? 1.08
                  : 0.62
              }
              transition={{
                delay: index * 0.025,
                duration:
                  7.8 +
                  (index % 6) * 0.62,
                ease: "easeInOut",
                repeat:
                  reducedMotion
                    ? 0
                    : Infinity,
              }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
