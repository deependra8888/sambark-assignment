import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";


type CartContextType = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const CartContext =
  createContext<CartContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Product[]>(() => {
    const data = localStorage.getItem("cart");

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}