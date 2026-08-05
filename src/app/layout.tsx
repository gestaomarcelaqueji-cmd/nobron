import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { MotionProvider } from "@/components/layout/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "noBRon | Tecnologia e soluções digitais",
  description:
    "Tecnologia e conhecimento profissional para criar marcas, sites, conteúdo, divulgação, sistemas e automações.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <MotionProvider>
          <FloatingHeader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
