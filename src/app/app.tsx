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
  return <main className="min-h-screen bg-paper text-ink"><header className="border-b border-black/10 bg-ink py-5 text-white"><Container><a href={import.meta.env.BASE_URL} className="font-display text-xl font-black tracking-[-0.08em]">PIZZA<span className="text-accent">LAB</span></a></Container></header><CheckoutForm /></main>;
}

function RouteMetadata() {
  const location = useLocation();
  useEffect(() => {
    const isCheckout = location.pathname.endsWith("/checkout");
    document.title = isCheckout ? "Оформление заказа | PIZZA LAB" : "PIZZA LAB — пицца с характером";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = isCheckout ? "noindex, nofollow" : "index, follow";
  }, [location.pathname]);
  return null;
}

export default function App() {
  return <><CartHydration /><RouteMetadata /><Routes><Route path="/" element={<HomePage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="*" element={<HomePage />} /></Routes><CartButton /><CartDrawer /><CartToast /></>;
}
