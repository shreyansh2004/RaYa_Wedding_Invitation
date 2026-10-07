import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import "./globals.css";

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
    "--wedding-pattern-image": `url("${basePath}/wedding-pattern-background.webp")`,
    "--invitation-cover-image": `url("${basePath}/ganesha-invitation-background.webp")`,
  } as CSSProperties;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Italianno&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={backgroundAssets}>{children}</body>
    </html>
  );
}
