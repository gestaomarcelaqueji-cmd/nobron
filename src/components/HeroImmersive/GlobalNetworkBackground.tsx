"use client";

import type { CSSProperties } from "react";
import type {
  FeatureCollection,
  Geometry,
} from "geojson";

import {
  geoEqualEarth,
  geoGraticule10,
  geoPath,
} from "d3-geo";

import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";

import styles from "./GlobalNetworkBackground.module.css";

/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const MAP_WIDTH = 1440;
const MAP_HEIGHT = 760;

type Coordinates = [number, number];

type ServiceIcon =
  | "design"
  | "marketing"
  | "strategy"
  | "sites";

type WorldTopology = {
  objects: {
    countries: unknown;
  };
};

type Connection = {
  id: string;
  label: string;
  icon: ServiceIcon;
  destination: Coordinates;
  delay: string;
  duration: string;
  chipWidth: number;
  curveLift: number;
};

type RouteStyle = CSSProperties & {
  "--route-delay": string;
  "--route-duration": string;
};

/*
 * Origem em Telêmaco Borba, Paraná.
 */
const BRAZIL_ORIGIN: Coordinates = [-50.62, -24.32];

/*
 * Cada serviço viaja para uma região diferente.
 * As coordenadas representam apenas alcance global.
 */
const CONNECTIONS: Connection[] = [
  {
    id: "design",
    label: "DESIGN",
    icon: "design",
    destination: [-74, 40.7],
    delay: "0s",
    duration: "9.4s",
    chipWidth: 88,
    curveLift: 145,
  },
  {
    id: "marketing",
    label: "MARKETING",
    icon: "marketing",
    destination: [-0.12, 51.5],
    delay: "2.4s",
    duration: "9.8s",
    chipWidth: 112,
    curveLift: 125,
  },
  {
    id: "strategy",
    label: "ESTRATÉGIA",
    icon: "strategy",
    destination: [18.42, -33.92],
    delay: "4.8s",
    duration: "8.8s",
    chipWidth: 116,
    curveLift: 82,
  },
  {
    id: "sites",
    label: "SITES",
    icon: "sites",
    destination: [103.81, 1.35],
    delay: "7.2s",
    duration: "10.6s",
    chipWidth: 78,
    curveLift: 155,
  },
];

/* =========================================================
   MAPA
========================================================= */

const topology =
  worldAtlas as unknown as WorldTopology;

const countries = feature(
  topology as never,
  topology.objects.countries as never,
) as unknown as FeatureCollection<Geometry>;

const projection = geoEqualEarth()
  .scale(235)
  .translate([
    MAP_WIDTH / 2,
    MAP_HEIGHT / 2 + 18,
  ])
  .precision(0.25);

const pathGenerator = geoPath(projection);

const originPosition =
  projection(BRAZIL_ORIGIN) ?? [0, 0];

const graticulePath =
  pathGenerator(geoGraticule10()) ?? "";

/*
 * Em vez de uma rota geográfica que pode quebrar
 * nas bordas do mapa, usamos uma curva Bézier SVG.
 *
 * Isso elimina aqueles riscos soltos.
 */
function createRoutePath(
  destination: Coordinates,
  curveLift: number,
) {
  const origin =
    projection(BRAZIL_ORIGIN) ?? [0, 0];

  const projectedDestination =
    projection(destination) ?? [0, 0];

  const [originX, originY] = origin;
  const [destinationX, destinationY] =
    projectedDestination;

  const middleX =
    (originX + destinationX) / 2;

  const middleY =
    (originY + destinationY) / 2 -
    curveLift;

  return {
    path: [
      `M ${originX} ${originY}`,
      `Q ${middleX} ${middleY}`,
      `${destinationX} ${destinationY}`,
    ].join(" "),
    destinationX,
    destinationY,
  };
}

const countryPaths = countries.features
  .map((country) => {
    const countryId = String(
      country.id ?? "",
    ).padStart(3, "0");

    return {
      id: countryId,
      path: pathGenerator(country) ?? "",
      isBrazil: countryId === "076",
    };
  })
  .filter((country) => Boolean(country.path));

const routes = CONNECTIONS.map(
  (connection) => ({
    ...connection,
    ...createRoutePath(
      connection.destination,
      connection.curveLift,
    ),
  }),
);

/* =========================================================
   ÍCONES
========================================================= */

type ServiceIconProps = {
  type: ServiceIcon;
};

function ServiceIconGraphic({
  type,
}: ServiceIconProps) {
  if (type === "design") {
    return (
      <g className={styles.serviceIcon}>
        <path
          d="M -7 5 C -3 -6 3 -6 7 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M -7 5 V -1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M 7 5 V -1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <circle
          cx="-7"
          cy="5"
          r="1.35"
          fill="currentColor"
        />

        <circle
          cx="7"
          cy="5"
          r="1.35"
          fill="currentColor"
        />

        <circle
          cx="0"
          cy="-2.2"
          r="1.35"
          fill="currentColor"
        />
      </g>
    );
  }

  if (type === "marketing") {
    return (
      <g className={styles.serviceIcon}>
        <path
          d="M -8 6 V 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M -2 6 V -3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M 4 6 V -6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M -8 -4 L -2 -7 L 4 -4 L 8 -8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 4 -8 H 8 V -4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }

  if (type === "strategy") {
    return (
      <g className={styles.serviceIcon}>
        <circle
          cx="-1"
          cy="1"
          r="6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <circle
          cx="-1"
          cy="1"
          r="2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M 1 -1 L 8 -8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M 4 -8 H 8 V -4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }

  return (
    <g className={styles.serviceIcon}>
      <rect
        x="-8"
        y="-6"
        width="16"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M -8 -2 H 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <circle
        cx="-5.5"
        cy="-4"
        r="0.8"
        fill="currentColor"
      />

      <circle
        cx="-3"
        cy="-4"
        r="0.8"
        fill="currentColor"
      />

      <path
        d="M -3 2 L 0 4.5 L 4 -1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* =========================================================
   COMPONENTE
========================================================= */

export function GlobalNetworkBackground() {
  return (
    <div
      className={styles.background}
      aria-hidden="true"
    >
      <div className={styles.ambientGlow} />

      <svg
        className={styles.map}
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="routeGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#2563eb"
            />

            <stop
              offset="48%"
              stopColor="#557fc5"
            />

            <stop
              offset="100%"
              stopColor="#475569"
            />
          </linearGradient>

          <radialGradient
            id="paranaAura"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity="1"
            />

            <stop
              offset="17%"
              stopColor="#8fc4ff"
              stopOpacity="0.95"
            />

            <stop
              offset="46%"
              stopColor="#2563eb"
              stopOpacity="0.28"
            />

            <stop
              offset="100%"
              stopColor="#2563eb"
              stopOpacity="0"
            />
          </radialGradient>

          <filter
            id="softRouteGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="2.2"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="paranaHubGlow"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur
              stdDeviation="5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grade de coordenadas */}
        <path
          className={styles.graticule}
          d={graticulePath}
          vectorEffect="non-scaling-stroke"
        />

        {/* Países */}
        <g className={styles.countries}>
          {countryPaths
            .filter(
              (country) => !country.isBrazil,
            )
            .map((country) => (
              <path
                key={country.id}
                className={styles.country}
                d={country.path}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </g>

        {/* Brasil */}
        {countryPaths
          .filter((country) => country.isBrazil)
          .map((country) => (
            <path
              key={country.id}
              className={styles.brazil}
              d={country.path}
              vectorEffect="non-scaling-stroke"
            />
          ))}

        {/* Rotas e serviços */}
        <g className={styles.routes}>
          {routes.map((route) => {
            const routeStyle: RouteStyle = {
              "--route-delay": route.delay,
              "--route-duration":
                route.duration,
            };

            return (
              <g key={route.id}>
                <path
                  className={styles.routeBase}
                  d={route.path}
                  vectorEffect="non-scaling-stroke"
                />

                <path
                  id={`route-${route.id}`}
                  className={
                    styles.routeAnimated
                  }
                  d={route.path}
                  pathLength={1000}
                  vectorEffect="non-scaling-stroke"
                  style={routeStyle}
                />

                {/* Ícone viajando */}
                <g
                  className={
                    styles.serviceTraveler
                  }
                  style={routeStyle}
                >
                  <g
                    className={
                      styles.serviceChip
                    }
                  >
                    <rect
                      className={
                        styles.serviceChipSurface
                      }
                      x="-16"
                      y="-15"
                      width={route.chipWidth}
                      height="30"
                      rx="15"
                    />

                    <g
                      transform="translate(0 0)"
                    >
                      <ServiceIconGraphic
                        type={route.icon}
                      />
                    </g>

                    <text
                      className={
                        styles.serviceLabel
                      }
                      x="18"
                      y="1"
                      dominantBaseline="middle"
                    >
                      {route.label}
                    </text>
                  </g>

                  <animateMotion
                    dur={route.duration}
                    begin={route.delay}
                    repeatCount="indefinite"
                    rotate="0"
                  >
                    <mpath
                      href={`#route-${route.id}`}
                    />
                  </animateMotion>
                </g>

                {/* Destino */}
                <g
                  className={
                    styles.destination
                  }
                  transform={[
                    "translate(",
                    route.destinationX,
                    " ",
                    route.destinationY,
                    ")",
                  ].join("")}
                  style={routeStyle}
                >
                  <circle
                    className={
                      styles.destinationRing
                    }
                    r="7"
                  />

                  <circle
                    className={
                      styles.destinationCore
                    }
                    r="3"
                  />
                </g>
              </g>
            );
          })}
        </g>

        {/* Origem no Paraná */}
        <g
          className={styles.paranaHub}
          transform={[
            "translate(",
            originPosition[0],
            " ",
            originPosition[1],
            ")",
          ].join("")}
        >
          <circle
            className={styles.hubAura}
            r="45"
            fill="url(#paranaAura)"
          />

          <circle
            className={styles.hubPulse}
            r="10"
          />

          <circle
            className={[
              styles.hubPulse,
              styles.hubPulseSecond,
            ].join(" ")}
            r="10"
          />

          <circle
            className={styles.hubOuter}
            r="7.5"
          />

          <circle
            className={styles.hubInner}
            r="3.2"
          />
        </g>
      </svg>

      <div className={styles.edgeFadeLeft} />
      <div className={styles.edgeFadeRight} />
      <div className={styles.contentFade} />
    </div>
  );
}