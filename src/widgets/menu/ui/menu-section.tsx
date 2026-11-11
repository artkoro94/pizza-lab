import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { products } from "@/entities/product/data/products";
import { Container } from "@/shared/ui/container";

export function MenuSection() {
  return (
    <section id="menu" className="bg-paper py-24 text-ink sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent-dark">Наше меню / 01—04</p>
            <h2 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-[-0.07em] sm:text-7xl">Выбирай<br />свой вайб<span className="text-accent">.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-black/50">Проверенная классика и смелые сочетания. Каждую пиццу готовим после заказа.</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <article key={product.id} className="group overflow-hidden rounded-[1.35rem] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(35,25,18,0.10)]">
              <div className="relative aspect-[1.12] overflow-hidden bg-[#eee9e2]">
                <Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 90vw, (max-width: 1280px) 44vw, 23vw" className="object-cover transition duration-700 group-hover:scale-105" />
                {product.badge && <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[9px] font-black tracking-[0.16em] text-white">{product.badge}</span>}
                <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-accent text-ink shadow-lg transition group-hover:rotate-90"><Plus size={20} /></span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-black tracking-tight">{product.name}</h3>
                  <span className="whitespace-nowrap text-sm font-extrabold">{product.price} ₽</span>
                </div>
                <p className="mt-2 min-h-10 text-xs leading-5 text-black/45">{product.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4 text-[10px] font-bold uppercase tracking-[0.13em] text-black/35">
                  <span>{product.weight}</span><span>№ 0{index + 1}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="#delivery" className="inline-flex items-center gap-3 rounded-full border border-black/15 px-6 py-3 text-xs font-extrabold uppercase tracking-wider transition hover:border-black">
            Условия доставки <ArrowUpRight size={15} />
          </a>
        </div>
      </Container>
    </section>
  );
}
