"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { brandingPageData } from "@/data/solutions/branding";

import styles from "./BrandForm.module.css";

type Pointer = { x: number; y: number; active: boolean };

export function BrandForm() {
  const reduceMotion = useReducedMotion();
  const { form } = brandingPageData;
  const [pointer, setPointer] = useState<Pointer>({ x: 50, y: 50, active: false });
  const [activeColor, setActiveColor] = useState(2);

  const cells = useMemo(
    () => Array.from({ length: 84 }, (_, index) => ({
      id: index,
      x: (index % 14) / 13 * 100,
      y: Math.floor(index / 14) / 5 * 100,
      char: form.letters[index % form.letters.length],
    })),
    [form.letters],
  );

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
      active: true,
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.layerMeta}>
          <span>{form.number}</span>
          <strong>{form.label}</strong>
        </div>
        <div className={styles.heading}>
          <h2>{form.title}</h2>
          <p>{form.description}</p>
        </div>
      </div>

      <div className={styles.experience}>
        <div
          className={styles.letterField}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setPointer((current) => ({ ...current, active: false }))}
          style={{ "--active-color": form.colors[activeColor].hex } as React.CSSProperties}
        >
          <div className={styles.fieldHeader}>
            <span>TYPE FIELD / VARIABLE WEIGHT</span>
            <span>MOVE</span>
          </div>

          {cells.map((cell) => {
            const dx = cell.x - pointer.x;
            const dy = cell.y - pointer.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = pointer.active ? Math.max(0, 1 - distance / 30) : 0;
            const weight = Math.round(320 + force * 560);
            const scale = 0.86 + force * 0.5;

            return (
              <span
                className={styles.letter}
                key={cell.id}
                style={{
                  left: `${cell.x}%`,
                  top: `${cell.y}%`,
                  fontWeight: weight,
                  opacity: 0.2 + force * 0.8,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  color: force > 0.48 ? form.colors[activeColor].hex : undefined,
                }}
              >
                {cell.char}
              </span>
            );
          })}

          <div className={styles.fieldWord} aria-hidden="true">IDENTIDADE</div>
        </div>

        <div className={styles.colorPanel}>
          <div className={styles.colorHeader}>
            <span>PALETA EM MOVIMENTO</span>
            <strong>{form.colors[activeColor].hex}</strong>
          </div>

          <div className={styles.colorBars}>
            {form.colors.map((color, index) => {
              const distance = Math.abs(index - activeColor);
              const lift = Math.max(0, 1 - distance * 0.28);

              return (
                <button
                  className={styles.colorBar}
                  key={color.hex}
                  type="button"
                  onPointerEnter={() => setActiveColor(index)}
                  onFocus={() => setActiveColor(index)}
                  aria-label={`Usar cor ${color.name}, ${color.hex}`}
                  style={{
                    "--color": color.hex,
                    "--lift": lift,
                  } as React.CSSProperties}
                >
                  <span className={styles.colorName}>{color.name}</span>
                  <span className={styles.colorCode}>{color.hex}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className={styles.wordmarkPreview}
            animate={{ backgroundColor: form.colors[activeColor].hex }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
