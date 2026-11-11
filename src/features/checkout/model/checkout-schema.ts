import { z } from "zod";

export const checkoutSchema = z
  .object({
    customerName: z.string().trim().min(2, "Укажи имя (не менее 2 символов)").max(60, "Слишком длинное имя"),
    phone: z
      .string()
      .trim()
      .regex(/^(?:\+7|8)\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, "Укажи российский номер, например +7 999 123-45-67"),
    deliveryMethod: z.enum(["delivery", "pickup"]),
    address: z.string().trim().max(200, "Слишком длинный адрес"),
    apartment: z.string().trim().max(20, "Слишком длинное значение"),
    entrance: z.string().trim().max(20, "Слишком длинное значение"),
    intercom: z.string().trim().max(20, "Слишком длинное значение"),
    floor: z.string().trim().max(20, "Слишком длинное значение"),
    paymentMethod: z.enum(["online", "courier"]),
    comment: z.string().trim().max(500, "Комментарий не должен превышать 500 символов"),
  })
  .superRefine((data, context) => {
    if (data.deliveryMethod === "pickup" && data.paymentMethod !== "online") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["paymentMethod"],
        message: "При самовывозе доступна только онлайн-оплата",
      });
    }

    if (data.deliveryMethod === "delivery" && data.address.length < 5) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "Укажи улицу и номер дома",
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
