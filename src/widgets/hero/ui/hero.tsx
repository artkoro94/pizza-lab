import { ArrowDown, ArrowUpRight, Clock3, Flame } from "lucide-react";
import { StoreHoursBoard } from "@/features/store-hours/ui/store-hours-board";
import { Container } from "@/shared/ui/container";
import { ImageWithReveal } from "@/shared/ui/image-with-reveal";

export function Hero() {
  return (
    <section className="hero-grid relative isolate min-h-[760px] overflow-hidden bg-ink pt-24 text-white sm:min-h-[820px] sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_42%,rgba(255,91,46,0.18),transparent_38%)]" />
      <Container className="relative grid min-h-[680px] items-center gap-10 pb-16 pt-6 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-reveal className="relative z-10 max-w-2xl">
          <StoreHoursBoard />
          <h1 className="font-display text-[clamp(4.1rem,9vw,8.6rem)] font-black uppercase leading-[0.83] tracking-[-0.085em]">
            Время<br /><span className="text-accent">пиццы.</span>
          </h1>
          <p className="mt-9 max-w-md text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Тонкое тесто, щедрая начинка и тот самый тянущийся сыр. Готовим из свежих ингредиентов и привозим горячей.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#menu" className="inline-flex h-14 items-center gap-4 rounded-full bg-accent px-7 text-sm font-extrabold text-ink transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(255,91,46,0.25)]">
              Выбрать пиццу <ArrowUpRight size={18} />
            </a>
            <span className="text-xs font-semibold text-white/45">от 490 ₽</span>
          </div>
          <div className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-7">
            <div className="flex items-center gap-3"><Clock3 className="text-accent" size={19} /><div><p className="text-sm font-bold">30–45 минут</p><p className="mt-1 text-xs text-white/40">Ориентир доставки</p></div></div>
            <div className="flex items-center gap-3"><Flame className="text-accent" size={19} /><div><p className="text-sm font-bold">Из печи</p><p className="mt-1 text-xs text-white/40">Готовим после заказа</p></div></div>
          </div>
        </div>
        <div data-reveal className="relative mx-auto aspect-square w-full max-w-[610px]">
          <div className="absolute inset-[8%] rounded-full border border-white/10" />
          <div className="absolute inset-[17%] rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-[23%] rounded-full bg-accent/15 blur-3xl" />
          <div className="hero-art absolute inset-0"><div className="absolute inset-0 rotate-[-12deg]">
            <ImageWithReveal src={import.meta.env.BASE_URL + "images/pizza-hero.jpg"} alt="Аппетитная пицца с сыром и свежими ингредиентами" fetchPriority="high" loading="eager" className="h-full w-full" imageClassName="h-full w-full object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.45)]" />
          </div></div>
          <div className="absolute bottom-[9%] left-0 rounded-2xl border border-white/10 bg-[#242321]/90 px-5 py-4 shadow-2xl backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Любовь с первого кусочка</p>
            <p className="mt-1 flex items-center gap-1 text-lg font-black">Сделано с огнём <ArrowUpRight className="text-accent" size={18} strokeWidth={2.5} /></p>
          </div>
          <div className="absolute right-[1%] top-[13%] grid size-20 rotate-12 place-items-center rounded-full bg-accent text-center text-[10px] font-black uppercase leading-tight tracking-wider text-ink shadow-xl">Только<br />горячая</div>
        </div>
      </Container>
      <a href="#menu" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 md:flex">Листайте ниже <ArrowDown size={14} /></a>
    </section>
  );
}
