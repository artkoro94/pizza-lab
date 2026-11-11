import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "@/entities/product/model/types";
import { selectCartCount, selectCartTotal, useCartStore, type CartItem } from "./cart-store";

const product: Product = {
  id: "margherita",
  name: "Маргарита",
  description: "Томатный соус, моцарелла и базилик",
  price: 590,
  weight: "450 г",
  category: "classic",
  image: "/images/margherita.webp",
};

const secondProduct: Product = { ...product, id: "pepperoni", name: "Пепперони", price: 690 };

const persistedItem: CartItem = {
  id: "margherita-30",
  productId: "margherita",
  name: "Маргарита",
  image: "/images/margherita.webp",
  size: "30",
  price: 740,
  quantity: 2,
};

const resetStore = () => {
  useCartStore.setState({ items: [], open: false, toast: null });
  localStorage.clear();
};

describe("useCartStore", () => {
  beforeEach(resetStore);

  it("adds a pizza with the selected size and calculated price", () => {
    useCartStore.getState().addItem(product, "30");
    expect(useCartStore.getState().items).toEqual([{
      id: "margherita-30", productId: "margherita", name: "Маргарита",
      image: "/images/margherita.webp", size: "30", price: 740, quantity: 1,
    }]);
  });

  it("increases quantity when the same pizza and size are added again", () => {
    const { addItem } = useCartStore.getState();
    addItem(product, "25");
    addItem(product, "25");
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("keeps different sizes of the same pizza as separate cart items", () => {
    const { addItem } = useCartStore.getState();
    addItem(product, "25");
    addItem(product, "35");
    expect(useCartStore.getState().items.map((item) => item.id)).toEqual(["margherita-25", "margherita-35"]);
  });

  it("keeps different products as separate cart items", () => {
    const { addItem } = useCartStore.getState();
    addItem(product, "25");
    addItem(secondProduct, "25");
    expect(useCartStore.getState().items.map((item) => item.productId)).toEqual(["margherita", "pepperoni"]);
  });

  it("increases and decreases item quantity", () => {
    const { addItem, increase, decrease } = useCartStore.getState();
    addItem(product, "25");
    increase("margherita-25");
    decrease("margherita-25");
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("removes an item when its quantity is decreased from one to zero", () => {
    useCartStore.getState().addItem(product, "25");
    useCartStore.getState().decrease("margherita-25");
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("removes only the selected item", () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(product, "25");
    addItem(secondProduct, "25");
    removeItem("margherita-25");
    expect(useCartStore.getState().items.map((item) => item.productId)).toEqual(["pepperoni"]);
  });

  it("clears all cart items", () => {
    const { addItem, clear } = useCartStore.getState();
    addItem(product, "25");
    addItem(secondProduct, "30");
    clear();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("calculates total item count and cart price", () => {
    const { addItem, increase } = useCartStore.getState();
    addItem(product, "25");
    increase("margherita-25");
    addItem(secondProduct, "30");
    const state = useCartStore.getState();
    expect(selectCartCount(state)).toBe(3);
    expect(selectCartTotal(state)).toBe(2020);
  });

  it("stores cart items in localStorage", () => {
    useCartStore.getState().addItem(product, "30");
    const persisted = JSON.parse(localStorage.getItem("pizza-lab-cart") ?? "null");
    expect(persisted.state.items).toHaveLength(1);
    expect(persisted.state.items[0].id).toBe("margherita-30");
    expect(persisted.state.items[0].price).toBe(740);
  });

  it("restores cart items from localStorage during rehydration", async () => {
    localStorage.setItem("pizza-lab-cart", JSON.stringify({ state: { items: [persistedItem] }, version: 0 }));
    await useCartStore.persist.rehydrate();
    expect(useCartStore.getState().items).toEqual([persistedItem]);
    expect(selectCartCount(useCartStore.getState())).toBe(2);
    expect(selectCartTotal(useCartStore.getState())).toBe(1480);
  });

  it("does not persist transient UI state", () => {
    useCartStore.getState().addItem(product, "25");
    useCartStore.getState().setOpen(true);
    useCartStore.getState().clearToast();
    const persisted = JSON.parse(localStorage.getItem("pizza-lab-cart") ?? "null");
    expect(persisted.state).toEqual({ items: useCartStore.getState().items });
    expect(persisted.state.open).toBeUndefined();
    expect(persisted.state.toast).toBeUndefined();
  });
});
