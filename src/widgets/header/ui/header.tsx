import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/shared/ui/container";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="font-display text-2xl font-black tracking-[-0.08em] text-white">
          PIZZA<span className="text-accent">LAB</span>
          <span className="ml-1 align-top text-[9px] font-semibold tracking-normal text-white/50">®</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/checkout" className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent px-4 py-2.5 text-xs font-extrabold text-ink transition-colors duration-200 ease-in-out hover:border-accent hover:bg-accent-dark sm:text-sm">
            Оформить заказ <ArrowUpRight size={15} />
          </Link>
        </div>
      </Container>
    </header>
  );
}
