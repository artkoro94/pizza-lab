"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  selectCartTotal,
  useCartStore,
} from "@/features/cart/model/cart-store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.open);
  const setOpen = useCartStore((state) => state.setOpen);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore(selectCartTotal);
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }
    const timeoutId = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <button
        type="button"
        aria-label="Закрыть корзину"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 cursor-default bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper text-ink shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-dark">PIZZA LAB</p>
            <h2 id="cart-title" className="mt-1 font-display text-2xl font-black">Корзина</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть" className="grid size-10 place-items-center rounded-full border border-black/10 transition hover:bg-black/5">
            <X size={19} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-white text-accent shadow-sm">
              <ShoppingBag size={30} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-black">Пока пусто</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-black/50">Самое время выбрать пиццу. Добавь любимую — и она появится здесь.</p>
            <button type="button" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-extrabold text-ink transition hover:bg-accent-dark">
              Перейти к меню
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <article key={item.id} className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-[#eee9e2]">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-black">{item.name}</h3>
                        <p className="mt-1 text-xs text-black/45">{item.size} см · {formatPrice(item.price)}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} aria-label={`Удалить ${item.name}`} className="grid size-8 shrink-0 place-items-center rounded-full text-black/35 transition hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 rounded-full bg-paper px-2 py-1">
                        <button type="button" onClick={() => decrease(item.id)} aria-label="Уменьшить количество" className="grid size-7 place-items-center rounded-full transition hover:bg-white"><Minus size={13} /></button>
                        <span className="min-w-4 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
                        <button type="button" onClick={() => increase(item.id)} aria-label="Увеличить количество" className="grid size-7 place-items-center rounded-full transition hover:bg-white"><Plus size={13} /></button>
                      </div>
                      <span className="text-sm font-black tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-black/10 bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/50">Итого</span>
                <strong className="font-display text-2xl font-black tabular-nums">{formatPrice(total)}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-black/40">Доставка и оформление заказа будут добавлены на следующем этапе.</p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-extrabold text-ink transition hover:bg-accent-dark"
              >
                Перейти к оформлению
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
