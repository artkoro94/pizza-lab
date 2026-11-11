import { describe, expect, it } from "vitest";
import { checkoutConfig, getDeliveryPrice } from "./checkout";

describe("getDeliveryPrice", () => {
  it("charges the configured fee below the free-delivery threshold", () => {
    expect(getDeliveryPrice(checkoutConfig.freeDeliveryFrom - 1, "delivery")).toBe(checkoutConfig.deliveryPrice);
  });
  it("makes delivery free at the threshold", () => {
    expect(getDeliveryPrice(checkoutConfig.freeDeliveryFrom, "delivery")).toBe(0);
  });
  it("makes delivery free above the threshold", () => {
    expect(getDeliveryPrice(checkoutConfig.freeDeliveryFrom + 1, "delivery")).toBe(0);
  });
  it("does not charge for pickup regardless of the order total", () => {
    expect(getDeliveryPrice(100, "pickup")).toBe(0);
  });
});
