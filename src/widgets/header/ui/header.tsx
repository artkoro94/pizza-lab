import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { DeliveryInfoButton } from "@/features/delivery/ui/delivery-info-button";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-black tracking-[-0.08em] text-white">
          PIZZA<span className="text-accent">LAB</span>
          <span className="ml-1 align-top text-[9px] font-semibold tracking-normal text-white/50">®</span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-9 text-sm font-medium text-white/65 md:flex">
          <a href="#menu" className="transition hover:text-white">Меню</a>
          <a href="#about" className="transition hover:text-white">О нас</a>
          <DeliveryInfoButton />
        </nav>

        <div className="flex items-center gap-3">
          <a href="#menu" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold text-accent transition hover:border-accent sm:hidden">
            Меню <ArrowUpRight size={14} />
          </a>
          <a href="#menu" className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-accent transition hover:border-accent sm:flex">
            Смотреть меню <ArrowUpRight size={15} />
          </a>
        </div>
      </Container>
    </header>
  );
}
