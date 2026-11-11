import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/shared/ui/container";

export function PromoSection() {
  return (
    <section id="about" className="bg-[#e9e3d9] py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-7 py-12 text-ink sm:px-14 sm:py-16">
          <div className="absolute -right-20 -top-32 size-96 rounded-full border border-black/10" />
          <div className="absolute -right-4 -top-16 size-64 rounded-full border border-black/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/55">Без компромиссов</p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.075em] sm:text-7xl">Хорошая пицца<br />не нуждается<br />в поводе.</h2>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold">
                <span className="inline-flex items-center gap-2"><Check size={15} /> Свежие продукты</span>
                <span className="inline-flex items-center gap-2"><Check size={15} /> Тесто собственного приготовления</span>
              </div>
            </div>
            <a href="#menu" className="inline-flex h-14 items-center justify-center gap-4 rounded-full bg-ink px-7 text-sm font-bold text-accent transition hover:scale-105">Найти любимую <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </Container>
    </section>
  );
}
