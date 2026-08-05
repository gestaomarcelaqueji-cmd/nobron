export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`logo ${inverted ? "logo--inverted" : ""}`} aria-label="noBRon">
      <span>no</span><strong>BR</strong><span>on</span>
    </span>
  );
}
