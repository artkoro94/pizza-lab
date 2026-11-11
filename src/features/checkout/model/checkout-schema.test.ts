import { describe, expect, it } from "vitest";
import { checkoutSchema, type CheckoutFormValues } from "./checkout-schema";

const validDelivery: CheckoutFormValues = {
  customerName: "Александр",
  phone: "+7 999 123-45-67",
  deliveryMethod: "delivery",
  address: "ул. Лесная, 85",
  apartment: "24",
  entrance: "2",
  intercom: "",
  floor: "5",
  paymentMethod: "courier",
  comment: "",
};

describe("checkoutSchema", () => {
  it("accepts valid delivery checkout with courier payment", () => {
    expect(checkoutSchema.safeParse(validDelivery).success).toBe(true);
  });

  it("accepts valid pickup checkout without an address", () => {
    const result = checkoutSchema.safeParse({
      ...validDelivery, deliveryMethod: "pickup", address: "", paymentMethod: "online",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a customer name shorter than two characters", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, customerName: "А" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.customerName).toBeDefined();
  });

  it("trims customer name before validation", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, customerName: "  Александр  " });
    expect(result.success && result.data.customerName).toBe("Александр");
  });

  it.each(["+7 999 123-45-67", "8 999 123-45-67", "+7(999)123-45-67"])(
    "accepts supported Russian phone format: %s",
    (phone) => expect(checkoutSchema.safeParse({ ...validDelivery, phone }).success).toBe(true),
  );

  it("rejects an invalid phone number", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, phone: "12345" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.phone).toBeDefined();
  });

  it("requires a delivery address when delivery is selected", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, address: "Дом" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.address).toBeDefined();
  });

  it("does not require an address for pickup", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, deliveryMethod: "pickup", address: "", paymentMethod: "online" });
    expect(result.success).toBe(true);
  });

  it("rejects courier payment for pickup", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, deliveryMethod: "pickup", address: "", paymentMethod: "courier" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.paymentMethod).toBeDefined();
  });

  it("rejects a comment longer than 500 characters", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, comment: "а".repeat(501) });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.flatten().fieldErrors.comment).toBeDefined();
  });

  it("accepts optional empty apartment and intercom fields", () => {
    const result = checkoutSchema.safeParse({ ...validDelivery, apartment: "", entrance: "", floor: "", intercom: "" });
    expect(result.success).toBe(true);
  });
});
