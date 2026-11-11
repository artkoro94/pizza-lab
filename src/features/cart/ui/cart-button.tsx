"use client";

import { ShoppingBag } from "lucide-react";
import { selectCartCount, selectCartTotal, useCartStore } from "@/features/cart/model/cart-store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export function CartButton() {
  const count = useCartStore(selectCartCount);
  const total = useCartStore(selectCartTotal);
  const setOpen = useCartStore((state) => state.setOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Открыть корзину: ${count} товаров на ${formatPrice(total)}`}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-full bg-accent px-5 text-ink shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.28)] active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span className="relative grid size-8 place-items-center rounded-full bg-ink/10">
        <ShoppingBag size={18} />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-black text-ink shadow">
            {count}
          </span>
        )}
      </span>
      <span className="text-left">
        <span className="block text-xs font-black">{count === 0 ? "Корзина" : `${count} ${count === 1 ? "товар" : count < 5 ? "товара" : "товаров"}`}</span>
        {count > 0 && <span className="mt-0.5 block text-[11px] font-bold text-ink/65">{formatPrice(total)}</span>}
      </span>
    </button>
  );
}
