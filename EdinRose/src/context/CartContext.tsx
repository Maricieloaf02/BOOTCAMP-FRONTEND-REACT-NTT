import React, { createContext, ReactNode } from 'react';
import { Product } from '@/domain/Product';
import { CartItem } from '@/domain/CartItem';
import useLocalStorage from '@/shared/hooks/useLocalStorage';

interface CartContextProps {
  cart: CartItem[]; // Usamos CartItem en lugar de Product
  addToCart: (product: Product) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []); // Guardar en localStorage

  // Agregar un producto al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }]; // Agregar nuevo producto con cantidad inicial de 1
    });
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
