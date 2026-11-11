export const siteConfig = {
  name: "PIZZA LAB",
  description: "Горячая пицца с характером. Выбирайте любимые вкусы в PIZZA LAB.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+7 999 123-45-67",
  currency: "RUB",
} as const;
