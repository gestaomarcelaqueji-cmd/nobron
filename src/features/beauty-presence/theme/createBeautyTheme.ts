import type { CSSProperties } from "react";
import type { BeautyTheme } from "../data/beauty.types";

type BeautyCssVariables = CSSProperties & Record<`--beauty-${string}`, string>;

export function createBeautyTheme(theme: BeautyTheme): BeautyCssVariables {
  return {
    "--beauty-bg": theme.background,
    "--beauty-ink": theme.foreground,
    "--beauty-accent": theme.accent,
    "--beauty-secondary": theme.secondary,
    "--beauty-surface": theme.surface,
    "--beauty-line": theme.line,
  };
}
