"use client";

import { usePathname } from "next/navigation";

import { GlobalFooter } from "./GlobalFooter/GlobalFooter";

export function PublicFooter() {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  return <GlobalFooter />;
}
