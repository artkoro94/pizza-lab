"use client";

import { ShoppingBag } from "lucide-react";
import { selectCartCount, useCartStore } from "@/features/cart/model/cart-store";

export function CartButton() {
  const count = useCartStore(selectCartCount);
  const setOpen = useCartStore((state) => state.setOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Открыть корзину, товаров: ${count}`}
      className="relative grid size-11 place-items-center rounded-full bg-accent text-ink transition hover:scale-105"
    >
      <ShoppingBag size={18} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-black text-ink shadow">
          {count}
        </span>
      )}
    </button>
  );
}
