import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { PublicFooter } from "@/components/layout/PublicFooter";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: DEFAULT_TITLE,

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,

  creator: SITE_NAME,

  publisher: SITE_NAME,

  icons: {
    icon: "/brand/favicon.png",
  },

  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang={SITE_LANGUAGE}
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>
        <MotionProvider>
          <FloatingHeader />

          {children}

          <PublicFooter />

          <MobileBottomNav />
        </MotionProvider>
      </body>
    </html>
  );
}