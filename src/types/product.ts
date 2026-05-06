export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};