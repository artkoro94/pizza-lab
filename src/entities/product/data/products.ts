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
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "four-cheese",
    name: "Четыре сыра",
    description: "Моцарелла, дорблю, пармезан и сливочный соус",
    price: 690,
    weight: "от 440 г",
    category: "vegetarian",
    badge: "НЕЖНАЯ",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "margarita",
    name: "Маргарита",
    description: "Спелые томаты, моцарелла, базилик и оливковое масло",
    price: 490,
    weight: "от 420 г",
    category: "classic",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "bbq",
    name: "Барбекю",
    description: "Копчёная курица, красный лук, моцарелла и соус барбекю",
    price: 650,
    weight: "от 480 г",
    category: "signature",
    badge: "НОВИНКА",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
];
