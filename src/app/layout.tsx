import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: {
    default: "PIZZA LAB — пицца с характером",
    template: "%s | PIZZA LAB",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: "PIZZA LAB — пицца с характером",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171716",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
