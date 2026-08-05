"use client";

import type { AboutStage } from "@/data/about/aboutPage";

import styles from "./StageMenu.module.css";

type StageMenuProps = {
  activeStageId: AboutStage["id"];
  stages: AboutStage[];
  onStageSelect?: (stageId: AboutStage["id"]) => void;
};

export function StageMenu({
  activeStageId,
  stages,
  onStageSelect,
}: StageMenuProps) {
  return (
    <nav
      aria-label="Seções da página Sobre"
      className={styles.stageMenu}
    >
      <div
        aria-hidden="true"
        className={styles.rail}
      />

      {stages.map((stage) => {
        const isActive =
          activeStageId === stage.id;

        return (
          <button
            aria-current={
              isActive ? "step" : undefined
            }
            aria-label={`Ir para ${stage.menuLabel}`}
            className={styles.stageMenuItem}
            data-active={isActive}
            key={stage.id}
            onClick={() =>
              onStageSelect?.(stage.id)
            }
            type="button"
          >
            <span
              aria-hidden="true"
              className={styles.marker}
            />

            <span className={styles.number}>
              {stage.id}
            </span>

            <span className={styles.label}>
              {stage.menuLabel}
            </span>
          </button>
        );
      })}
    </nav>
  );
}