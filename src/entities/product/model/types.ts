export type ProductCategory = "all" | "classic" | "signature" | "vegetarian";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: Exclude<ProductCategory, "all">;
  badge?: string;
  image: string;
};
