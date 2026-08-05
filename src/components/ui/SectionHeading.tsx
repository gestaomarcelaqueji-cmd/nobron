import { MaskReveal } from "@/components/animations/MaskReveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("section-heading", align === "center" && "section-heading--center", className)}>
      <h2 className="section-title"><MaskReveal>{title}</MaskReveal></h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
