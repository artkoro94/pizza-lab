import { Container } from "@/shared/ui/container";
import { siteConfig } from "@/shared/config/site";

export function Footer() {
  return (
    <footer id="delivery" className="bg-ink py-12 text-white">
      <Container>
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div>
            <a href="#" className="font-display text-3xl font-black tracking-[-0.08em]">PIZZA<span className="text-accent">LAB</span></a>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">Горячая пицца, яркие вкусы и доставка с заботой.</p>
            <p className="mt-3 max-w-lg text-xs leading-5 text-white/35">PIZZA LAB — демонстрационный концепт сайта. Сайт не является публичной офертой. Заказы и платежи в демонстрационной версии не принимаются; информация об ассортименте, ценах и доставке приведена для примера.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-white/35">Есть вопросы?</span>
            <a className="text-xl font-bold transition hover:text-accent" href={`tel:${siteConfig.phone.replace(/[^+\\d]/g, "")}`}>{siteConfig.phone}</a>
          </div>
        </div>
        <div className="pt-7 text-center text-[10px] font-semibold uppercase tracking-wider text-white/35">
          © 2026 PIZZA LAB. Демо-концепция.
        </div>
      </Container>
    </footer>
  );
}
