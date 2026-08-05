import type { MouseEvent as ReactMouseEvent } from "react";

export type HeroPhase =
  | "intro"
  | "network-points"
  | "network-connections"
  | "observing"
  | "portals"
  | "interactive"
  | "route-exit";

export type HeroSolutionId =
  | "landing-page"
  | "strategy"
  | "branding"
  | "sites-systems"
  | "seo"
  | "marketing-digital"
  | "automation";

export type HeroPortalFallbackPosition = Readonly<{
  /** Posição horizontal em porcentagem da área visível. */
  x: number;
  /** Posição vertical em porcentagem da área visível. */
  y: number;
}>;

export type HeroSolution = Readonly<{
  id: HeroSolutionId;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  ambientLabel: string;
  featured: boolean;
  order: number;
  /**
   * Índice estável sugerido na formação principal da rede. A cena pode usar
   * outro nó e continuar atualizando o portal por `updatePositions`.
   */
  nodeIndex: number;
  fallback: Readonly<{
    desktop: HeroPortalFallbackPosition;
    mobile: HeroPortalFallbackPosition;
  }>;
}>;

export type HeroAmbientWord = Readonly<{
  label: string;
  x: number;
  y: number;
}>;

export type PortalScreenPosition = Readonly<{
  /**
   * Coordenada X em pixels, relativa à caixa do `SolutionMapOverlay`.
   */
  x: number;
  /**
   * Coordenada Y em pixels, relativa à caixa do `SolutionMapOverlay`.
   */
  y: number;
  /** Escala opcional calculada a partir da profundidade do nó. */
  scale?: number;
  /** Permite ocultar visualmente um nó atrás da câmera. */
  visible?: boolean;
}>;

export type SolutionPortalPositions = Partial<
  Record<HeroSolutionId, PortalScreenPosition>
>;

export type SolutionMapOverlayHandle = {
  /**
   * Atualiza as posições projetadas diretamente no DOM, sem renderizar React a
   * cada frame da cena 3D.
   */
  updatePositions: (positions: SolutionPortalPositions) => void;
  /** Volta todos os portais às posições CSS de segurança. */
  resetPositions: () => void;
  /** Remove o destaque ativo e fecha o painel móvel. */
  clearActive: () => void;
};

export type HeroSolutionNavigateHandler = (
  solution: HeroSolution,
  event: ReactMouseEvent<HTMLAnchorElement>,
) => void;

