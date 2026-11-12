const deploymentUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
);

export const siteConfig = {
  name: "PIZZA LAB",
  description: "Горячая пицца с характером. Выбирайте любимые вкусы в PIZZA LAB.",
  url: deploymentUrl.replace(/\/$/, ""),
  phone: "+7 999 123-45-67",
  currency: "RUB",
} as const;
