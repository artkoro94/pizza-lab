export const checkoutConfig = {
  deliveryPrice: 199,
  freeDeliveryFrom: 1500,
} as const;

export type DeliveryMethod = "delivery" | "pickup";

export function getDeliveryPrice(total: number, method: DeliveryMethod): number {
  if (method === "pickup" || total >= checkoutConfig.freeDeliveryFrom) {
    return 0;
  }
  return checkoutConfig.deliveryPrice;
}
