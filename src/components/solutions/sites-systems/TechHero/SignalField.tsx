"use client";

import { useEffect, useRef } from "react";

import styles from "./TechHero.module.css";

type SignalFieldProps = {
  reducedMotion?: boolean;
};

type Particle = {
  angle: number;
  band: number;
  depth: number;
  phase: number;
  size: number;
  color: number;
  signal: boolean;
};

type Edge = {
  from: number;
  to: number;
  strength: number;
};

type Point = {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: number;
  signal: boolean;
};

type FieldGeometry = {
  particles: Particle[];
  edges: Edge[];
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
};

const TAU = Math.PI * 2;

const COLORS = [
  [39, 94, 254],
  [36, 198, 226],
  [125, 87, 255],
] as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 43758.5453;

  return value - Math.floor(value);
}

function createGeometry(width: number): FieldGeometry {
  const isMobile = width < 720;
  const strandCount = isMobile ? 25 : 46;
  const pointsPerStrand = isMobile ? 17 : 24;
  const particles: Particle[] = [];
  const edges: Edge[] = [];

  for (let strand = 0; strand < strandCount; strand += 1) {
    const strandRatio = strand / Math.max(1, strandCount - 1);
    const band = (strandRatio - 0.5) * 2;
    const strandPhase = seededRandom(strand + 10) * TAU;

    for (let point = 0; point < pointsPerStrand; point += 1) {
      const index = particles.length;
      const pointRatio = point / Math.max(1, pointsPerStrand - 1);
      const jitter =
        (seededRandom(strand * 71 + point * 13) - 0.5) * 0.022;

      particles.push({
        angle: pointRatio * TAU + jitter,
        band,
        depth: seededRandom(strand * 33 + point * 19),
        phase:
          strandPhase + seededRandom(strand * 91 + point) * 1.7,
        size:
          0.48 + seededRandom(strand * 51 + point * 7) * 1.22,
        color: Math.floor(
          seededRandom(strand * 17 + point * 23) * COLORS.length,
        ),
        signal: seededRandom(strand * 117 + point * 31) > 0.982,
      });

      if (point > 0) {
        edges.push({
          from: index - 1,
          to: index,
          strength:
            0.18 + seededRandom(strand * 43 + point) * 0.48,
        });
      }

      if (strand > 0 && point % 4 === 0) {
        const previousStrandIndex = index - pointsPerStrand;

        if (previousStrandIndex >= 0) {
          edges.push({
            from: previousStrandIndex,
            to: index,
            strength:
              0.08 + seededRandom(strand * 67 + point) * 0.24,
          });
        }
      }
    }
  }

  return { particles, edges };
}

export function SignalField({ reducedMotion = false }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const renderingContext = canvasElement.getContext("2d");

    if (!renderingContext) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = renderingContext;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let startTime = performance.now();
    let geometry: FieldGeometry = { particles: [], edges: [] };
    let renderedPoints: Point[] = [];

    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    function resize() {
      const bounds = canvas.getBoundingClientRect();

      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      geometry = createGeometry(width);
      renderedPoints = new Array(geometry.particles.length);

      if (reducedMotion) {
        draw(0);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      pointer.active = inside;

      if (!inside) {
        return;
      }

      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;

      if (pointer.x === 0 && pointer.y === 0) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function calculatePoint(
      particle: Particle,
      time: number,
      intro: number,
    ): Point {
      const centerX = width * 0.5;
      const centerY = height * 0.51;
      const radiusX = Math.min(width * 0.47, 820);
      const radiusY = Math.min(height * 0.39, 420);
      const movementTime = reducedMotion ? 0 : time;
      const angle =
        particle.angle +
        Math.sin(movementTime * 0.09 + particle.phase) * 0.025;
      const breathing =
        1 + Math.sin(movementTime * 0.48 + particle.phase) * 0.027;
      const organicDistortion =
        Math.sin(
          angle * 3 + movementTime * 0.27 + particle.phase,
        ) *
          0.085 +
        Math.cos(angle * 5 - movementTime * 0.21) * 0.037;
      const bandRadius = 0.65 + particle.band * 0.19 + organicDistortion;
      const asymmetryX =
        Math.sin(angle * 2 + movementTime * 0.2) * radiusX * 0.055;
      const asymmetryY =
        Math.cos(angle * 3 - movementTime * 0.17) * radiusY * 0.065;
      const depthShift = (particle.depth - 0.5) * 22;

      let x =
        centerX +
        Math.cos(angle) * radiusX * bandRadius * breathing +
        asymmetryX +
        Math.sin(particle.phase + movementTime * 0.33) * depthShift;
      let y =
        centerY +
        Math.sin(angle) *
          radiusY *
          bandRadius *
          (0.9 + Math.cos(angle * 2) * 0.08) +
        asymmetryY +
        Math.cos(particle.phase - movementTime * 0.28) * depthShift * 0.6;

      x = centerX + (x - centerX) * intro;
      y = centerY + (y - centerY) * intro;

      if (pointer.active) {
        const deltaX = x - pointer.x;
        const deltaY = y - pointer.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const influenceRadius = Math.min(190, width * 0.18);

        if (distance < influenceRadius && distance > 0) {
          const force = (1 - distance / influenceRadius) * 38;

          x += (deltaX / distance) * force;
          y += (deltaY / distance) * force;
        }
      }

      const edgeFadeX = Math.min(
        1,
        Math.min(x / (width * 0.14), (width - x) / (width * 0.14)),
      );
      const edgeFadeY = Math.min(
        1,
        Math.min(y / (height * 0.12), (height - y) / (height * 0.12)),
      );
      const edgeFade = clamp(Math.min(edgeFadeX, edgeFadeY), 0, 1);
      const depthAlpha = 0.18 + particle.depth * 0.58;

      return {
        x,
        y,
        alpha: edgeFade * depthAlpha * intro,
        size: particle.size * (0.65 + particle.depth * 0.8),
        color: particle.color,
        signal: particle.signal,
      };
    }

    function drawConnections() {
      context.save();
      context.lineWidth = 0.55;
      context.lineCap = "round";

      for (const edge of geometry.edges) {
        const from = renderedPoints[edge.from];
        const to = renderedPoints[edge.to];

        if (!from || !to) {
          continue;
        }

        const alpha =
          Math.min(from.alpha, to.alpha) * edge.strength * 0.36;

        if (alpha < 0.012) {
          continue;
        }

        context.strokeStyle = `rgba(77, 105, 204, ${alpha})`;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
      }

      context.restore();
    }

    function drawParticles() {
      context.save();

      for (const point of renderedPoints) {
        if (!point || point.alpha <= 0) {
          continue;
        }

        const color = COLORS[point.color] ?? COLORS[0];

        context.fillStyle =
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${point.alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, TAU);
        context.fill();
      }

      context.restore();
    }

    function drawSignals(time: number) {
      context.save();
      context.globalCompositeOperation = "lighter";

      for (let index = 0; index < renderedPoints.length; index += 1) {
        const point = renderedPoints[index];

        if (!point?.signal || point.alpha < 0.08) {
          continue;
        }

        const pulse = reducedMotion
          ? 0.55
          : (Math.sin(time * 1.7 + index) + 1) / 2;
        const color = COLORS[point.color] ?? COLORS[0];
        const radius = 3 + pulse * 5;
        const gradient = context.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius * 4,
        );

        gradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.7 * point.alpha})`,
        );
        gradient.addColorStop(
          0.18,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.25 * point.alpha})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`,
        );

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(point.x, point.y, radius * 4, 0, TAU);
        context.fill();

        context.fillStyle =
          `rgba(255, 255, 255, ${0.92 * point.alpha})`;
        context.beginPath();
        context.arc(point.x, point.y, 1.15 + pulse, 0, TAU);
        context.fill();
      }

      context.restore();
    }

    function draw(elapsedMilliseconds: number) {
      const time = elapsedMilliseconds / 1000;
      const intro = reducedMotion
        ? 1
        : easeOutCubic(clamp(elapsedMilliseconds / 1800, 0, 1));

      pointer.x += (pointer.targetX - pointer.x) * 0.075;
      pointer.y += (pointer.targetY - pointer.y) * 0.075;

      context.clearRect(0, 0, width, height);

      for (let index = 0; index < geometry.particles.length; index += 1) {
        renderedPoints[index] = calculatePoint(
          geometry.particles[index],
          time,
          intro,
        );
      }

      drawConnections();
      drawParticles();
      drawSignals(time);
    }

    function animate(currentTime: number) {
      draw(currentTime - startTime);
      frameId = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    resize();

    if (!reducedMotion) {
      startTime = performance.now();
      frameId = window.requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={styles.signalCanvas}
    />
  );
}
