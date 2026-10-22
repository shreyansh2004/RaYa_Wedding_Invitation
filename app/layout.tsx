import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import { Eczar } from "next/font/google";
import "./globals.css";
import "./invitation-en.css";
import "./invitation-hi.css";

const eczar = Eczar({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
  display: "swap",
});

const indu = localFont({
  src: "./fonts/AMS-Indu.ttf",
  variable: "--font-ams-indu",
  display: "swap",
});

const aakash = localFont({
  src: "./fonts/AMS-Aakash.ttf",
  variable: "--font-ams-aakash",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riya & Rahul | Wedding Invitation",
  description:
    "With joy in our hearts, Riya Kothari and Rahul Mehta invite you to celebrate their wedding on 27 December 2026.",
  applicationName: "Riya & Rahul Wedding",
  openGraph: {
    title: "Riya & Rahul | Wedding Invitation",
    description: "A celebration of love, family, and forever. 27 December 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101936",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const backgroundAssets = {
    "--page-background-image": `url("${basePath}/background.jpg")`,
    "--invitation-frame-image": `url("${basePath}/invitation-frame.png")`,
    "--invitation-cover-image": `url("${basePath}/ganesha-invitation-background.webp")`,
  } as CSSProperties;

  return (
    <html lang="en" className={`${eczar.variable} ${indu.variable} ${aakash.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Italianno&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"></link>
      </head>
      <body style={backgroundAssets}>{children}</body>
    </html>
  );
}
