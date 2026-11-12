import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartDrawer } from "@/features/cart/ui/cart-drawer";
import { CartButton } from "@/features/cart/ui/cart-button";
import { CartHydration } from "@/features/cart/ui/cart-hydration";
import { CartToast } from "@/features/cart/ui/cart-toast";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "PIZZA LAB — пицца с характером",
    template: "%s | PIZZA LAB",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: "PIZZA LAB — пицца с характером",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "PIZZA LAB — пицца с характером",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171716",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <CartHydration />
        {children}
        <CartButton />
        <CartDrawer />
        <CartToast />
      </body>
    </html>
  );
}
