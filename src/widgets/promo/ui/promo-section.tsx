import { ArrowUpRight, Check, Phone } from "lucide-react";
import { siteConfig } from "@/shared/config/site";
import { DeliveryInfoButton } from "@/features/delivery/ui/delivery-info-button";
import { Container } from "@/shared/ui/container";

export function PromoSection() {
  return (
    <section id="about" className="bg-[#e9e3d9] py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-7 py-12 text-ink sm:px-14 sm:py-16">
          <div className="absolute -right-20 -top-32 size-96 rounded-full border border-black/10" />
          <div className="absolute -right-4 -top-16 size-64 rounded-full border border-black/10" />
          <div className="relative grid gap-10 text-center lg:grid-cols-[1fr_auto] lg:items-end lg:text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/55">Без компромиссов</p>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.075em] sm:text-7xl lg:mx-0">Хорошая пицца<br />не нуждается<br />в поводе.</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs font-bold lg:justify-start">
                <span className="inline-flex items-center gap-2"><Check size={15} /> Свежие продукты</span>
                <span className="inline-flex items-center gap-2"><Check size={15} /> Тесто собственного приготовления</span>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:flex-row lg:mx-0 lg:w-auto lg:max-w-none lg:flex-col">
              <a href="#menu" className="inline-flex h-14 w-full items-center justify-center gap-4 rounded-full bg-ink px-5 text-sm font-bold text-accent transition hover:scale-105">Найти любимую <ArrowUpRight size={17} /></a>
              <a href={`tel:${siteConfig.phone.replace(/[^+\\d]/g, "")}`} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-5 text-sm font-bold text-ink transition hover:bg-ink/5"><Phone size={16} /> {siteConfig.phone}</a>
              <DeliveryInfoButton variant="promo" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
