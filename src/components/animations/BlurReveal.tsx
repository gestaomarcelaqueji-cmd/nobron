import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function BlurReveal({
  className,
  children,
  delay: _delay = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  void _delay;

  return (
    <div
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}
