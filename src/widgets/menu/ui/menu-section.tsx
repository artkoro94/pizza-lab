"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { products } from "@/entities/product/data/products";
import type { PizzaSize } from "@/features/cart/model/cart-store";
import { getPizzaPrice, useCartStore } from "@/features/cart/model/cart-store";
import { DeliveryInfoButton } from "@/features/delivery/ui/delivery-info-button";
import { Container } from "@/shared/ui/container";

const sizes: { value: PizzaSize; label: string }[] = [
  { value: "25", label: "25 см" },
  { value: "30", label: "30 см" },
  { value: "35", label: "35 см" },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export function MenuSection() {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSize>>({});

  const chooseSize = (productId: string, size: PizzaSize) =>
    setSelectedSizes((current) => ({ ...current, [productId]: size }));

  const handleAdd = (product: (typeof products)[number]) => {
    addItem(product, selectedSizes[product.id] ?? "30");
  };

  return (
    <section id="menu" className="bg-paper py-24 text-ink sm:py-32">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent-dark">Наше меню / 01—04</p>
            <h2 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-[-0.07em] sm:text-7xl">Выбирай<br />свой вайб<span className="text-accent">.</span></h2>
          </div>
          <div className="relative max-w-sm self-start border-l-2 border-accent pl-5 sm:mb-2 sm:self-end">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">Свежая из печи</p>
            <p className="mt-2 text-sm font-medium leading-6 text-ink/65 sm:text-[15px]">
              Проверенная классика и смелые сочетания. Каждую пиццу готовим после заказа.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => {
            const size = selectedSizes[product.id] ?? "30";
            const selectedIndex = sizes.findIndex((option) => option.value === size);
            return (
              <article key={product.id} data-reveal style={{ transitionDelay: `${index * 65}ms` }} className="group overflow-hidden rounded-[1.35rem] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(35,25,18,0.10)]">
                <div className="relative aspect-[1.55] overflow-hidden bg-[#eee9e2]">
                  <img src={product.image} alt={product.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  {product.badge && <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[9px] font-black tracking-[0.16em] text-white">{product.badge}</span>}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-black tracking-tight">{product.name}</h3>
                    <span className="whitespace-nowrap text-sm font-extrabold tabular-nums">{formatPrice(getPizzaPrice(product.price, size))}</span>
                  </div>
                  <p className="mt-2 min-h-10 text-xs leading-5 text-black/45">{product.description}</p>
                  <div role="group" aria-label={`Размер пиццы ${product.name}`} className="relative mt-4 grid grid-cols-3 rounded-full bg-paper p-1">
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc((100%-8px)/3)] rounded-full bg-ink shadow-sm transition-transform duration-300 ease-in-out" style={{ transform: `translateX(${selectedIndex * 100}%)` }} />
                    {sizes.map((option) => (
                      <button key={option.value} type="button" onClick={() => chooseSize(product.id, option.value)} aria-pressed={size === option.value} className={`relative z-10 cursor-pointer rounded-full px-2 py-2 text-[11px] font-extrabold transition-colors duration-300 ease-in-out ${size === option.value ? "text-white" : "text-black/45 hover:text-ink"}`}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-black/35">№ 0{index + 1}</span>
                    <button type="button" onClick={() => handleAdd(product)} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-accent px-4 text-xs font-extrabold text-ink transition-colors duration-200 ease-in-out hover:bg-accent-dark active:scale-[0.97]">
                      <Plus size={16} /> В корзину
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div data-reveal className="mt-10 flex justify-center">
          <DeliveryInfoButton variant="promo" />
        </div>
      </Container>
    </section>
  );
}
