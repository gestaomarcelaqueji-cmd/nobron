"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./TechUtilities.module.css";

type TermHelpProps = {
  label: string;
  explanation: string;
  compact?: boolean;
};

export function TermHelp({
  label,
  explanation,
  compact = false,
}: TermHelpProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    width: number;
    placement: "top" | "bottom";
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const viewportPadding = 12;
    const width = Math.min(304, window.innerWidth - viewportPadding * 2);
    const centeredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.min(
      Math.max(viewportPadding, centeredLeft),
      window.innerWidth - width - viewportPadding,
    );
    const placement = rect.top > 150 ? "top" : "bottom";
    const top = placement === "top" ? rect.top - 10 : rect.bottom + 10;

    setPosition({ left, top, width, placement });
  }, []);

  function showHelp() {
    updatePosition();
    setOpen(true);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updatePosition]);

  return (
    <span
      className={compact ? styles.compactTerm : styles.term}
      onPointerLeave={() => setOpen(false)}
    >
      <span className={styles.termLabel}>{label}</span>

      <button
        ref={buttonRef}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        aria-label={`Explicar ${label}`}
        className={styles.termButton}
        onBlur={() => setOpen(false)}
        onClick={showHelp}
        onFocus={showHelp}
        onPointerEnter={showHelp}
        type="button"
      >
        ?
      </button>

      {open && position &&
        createPortal(
          <span
            className={styles.termPopover}
            data-placement={position.placement}
            id={id}
            role="tooltip"
            style={{
              left: position.left,
              top: position.top,
              width: position.width,
            }}
          >
            {explanation}
          </span>,
          document.body,
        )}
    </span>
  );
}
