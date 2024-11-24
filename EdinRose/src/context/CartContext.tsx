import React, { createContext, ReactNode } from 'react';
import { Product } from '@/domain/Product';
import useLocalStorage from '@/shared/hooks/useLocalStorage'

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void; 
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Usa el hook `useLocalStorage` para almacenar el carrito en el localStorage
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
