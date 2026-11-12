import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartButton } from "@/features/cart/ui/cart-button";
import { CartDrawer } from "@/features/cart/ui/cart-drawer";
import { CartHydration } from "@/features/cart/ui/cart-hydration";
import { CartToast } from "@/features/cart/ui/cart-toast";
import { CheckoutForm } from "@/features/checkout/ui/checkout-form";
import { Container } from "@/shared/ui/container";
import { Footer } from "@/widgets/footer/ui/footer";
import { Header } from "@/widgets/header/ui/header";
import { Hero } from "@/widgets/hero/ui/hero";
import { MenuSection } from "@/widgets/menu/ui/menu-section";
import { PromoSection } from "@/widgets/promo/ui/promo-section";

function HomePage() {
  return <><Header /><main><Hero /><MenuSection /><PromoSection /></main><Footer /></>;
}

function CheckoutPage() {
  return <main className="min-h-screen bg-paper text-ink"><header className="border-b border-white/10 bg-ink text-white"><Container className="flex h-16 items-center justify-between"><a href={import.meta.env.BASE_URL} className="font-display text-2xl font-black tracking-[-0.08em]">PIZZA<span className="text-accent">LAB</span></a><a href={import.meta.env.BASE_URL} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white transition-colors duration-200 ease-in-out hover:border-accent hover:bg-accent hover:text-ink"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>На главную</a></Container></header><CheckoutForm /></main>;
}

function RouteMetadata() {
  const location = useLocation();
  useEffect(() => {
    const isCheckout = location.pathname.endsWith("/checkout");
    document.title = isCheckout ? "Оформление заказа | PIZZA LAB" : "PIZZA LAB — пицца с характером";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    robots.content = isCheckout ? "noindex, nofollow" : "index, follow";
  }, [location.pathname]);
  return null;
}

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  return <><CartHydration /><RouteMetadata /><ScrollToHash /><Routes><Route path="/" element={<HomePage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="*" element={<HomePage />} /></Routes><CartButton /><CartDrawer /><CartToast /></>;
}
