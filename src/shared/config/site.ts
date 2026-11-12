const deploymentUrl = import.meta.env.VITE_SITE_URL ?? "https://artkoro94.github.io/pizza-lab";

export const siteConfig = {
  name: "PIZZA LAB",
  description: "Горячая пицца с характером. Выбирайте любимые вкусы в PIZZA LAB.",
  url: deploymentUrl.replace(/\/$/, ""),
  phone: "+7 999 123-45-67",
  currency: "RUB",
} as const;
