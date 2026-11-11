import { Footer } from "@/widgets/footer/ui/footer";
import { Header } from "@/widgets/header/ui/header";
import { Hero } from "@/widgets/hero/ui/hero";
import { MenuSection } from "@/widgets/menu/ui/menu-section";
import { PromoSection } from "@/widgets/promo/ui/promo-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <PromoSection />
      </main>
      <Footer />
    </>
  );
}
