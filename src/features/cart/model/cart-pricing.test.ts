import { describe, expect, it } from "vitest";
import { getPizzaPrice } from "./cart-pricing";

describe("getPizzaPrice", () => {
  it("uses the base price for a 25 cm pizza", () => {
    expect(getPizzaPrice(590, "25")).toBe(590);
  });
  it("adds 150 ₽ for a 30 cm pizza", () => {
    expect(getPizzaPrice(590, "30")).toBe(740);
  });
  it("adds 300 ₽ for a 35 cm pizza", () => {
    expect(getPizzaPrice(590, "35")).toBe(890);
  });
});
