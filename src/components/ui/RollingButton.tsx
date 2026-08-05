"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  showArrow?: boolean;
};

export function RollingButton({
  children,
  className,
  variant = "primary",
  showArrow = false,
  ...props
}: Props) {
  return (
    <a className={cn("rolling-button", `rolling-button--${variant}`, className)} {...props}>
      <span className="rolling-button__track" aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
      <span className="sr-only">{children}</span>
      {showArrow ? <ArrowUpRight size={18} aria-hidden="true" /> : null}
    </a>
  );
}
