"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/entities/product/model/types";
import { getPizzaPrice } from "./cart-pricing";

export { getPizzaPrice } from "./cart-pricing";

export type PizzaSize = "25" | "30" | "35";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: PizzaSize;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  open: boolean;
  toast: string | null;
  clearToast: () => void;
  setOpen: (open: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      toast: null,
      clearToast: () => set({ toast: null }),
      addItem: (product, size) => {
        const id = `${product.id}-${size}`;
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          return {
            items: existing
              ? state.items.map((item) =>
                  item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
                )
              : [
                  ...state.items,
                  {
                    id,
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    size,
                    price: getPizzaPrice(product.price, size),
                    quantity: 1,
                  },
                ],
            open: false,
            toast: `${product.name} добавлена в корзину`,
          };
        });
      },
      increase: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          items: state.items.flatMap((item) =>
            item.id === id
              ? item.quantity > 1
                ? [{ ...item, quantity: item.quantity - 1 }]
                : []
              : [item],
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "pizza-lab-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }) as CartState,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
