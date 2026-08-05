import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function MaskReveal({
  children,
  className,
  delay: _delay = 0,
  eager: _eager = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
}) {
  void _delay;
  void _eager;

  return (
    <span className="mask-reveal">
      <span className={cn(className)}>
        {children}
      </span>
    </span>
  );
}
