import type { Product } from "../model/types";

export const products: Product[] = [
  {
    id: "pepperoni",
    name: "Пепперони",
    description: "Пикантная пепперони, моцарелла и фирменный томатный соус",
    price: 590,
    weight: "от 450 г",
    category: "classic",
    badge: "ХИТ",
    image: "/images/pizza-lab-realistic-images/public/images/pepperoni.webp",
  },
  {
    id: "four-cheese",
    name: "Четыре сыра",
    description: "Моцарелла, дорблю, пармезан и сливочный соус",
    price: 690,
    weight: "от 440 г",
    category: "vegetarian",
    badge: "НЕЖНАЯ",
    image: "/images/pizza-lab-realistic-images/public/images/four-cheese.webp",
  },
  {
    id: "margarita",
    name: "Маргарита",
    description: "Спелые томаты, моцарелла, базилик и оливковое масло",
    price: 490,
    weight: "от 420 г",
    category: "classic",
    image: "/images/pizza-lab-realistic-images/public/images/margherita.webp",
  },
  {
    id: "bbq",
    name: "Барбекю",
    description: "Копчёная курица, красный лук, моцарелла и соус барбекю",
    price: 650,
    weight: "от 480 г",
    category: "signature",
    badge: "НОВИНКА",
    image: "/images/pizza-lab-realistic-images/public/images/bbq.webp",
  },
];
