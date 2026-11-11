import type { PizzaSize } from "./cart-store";

const SIZE_EXTRA: Record<PizzaSize, number> = {
  "25": 0,
  "30": 150,
  "35": 300,
};

export function getPizzaPrice(basePrice: number, size: PizzaSize): number {
  return basePrice + SIZE_EXTRA[size];
}
