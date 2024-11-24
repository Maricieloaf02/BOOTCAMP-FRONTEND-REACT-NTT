import React, { createContext, ReactNode, useReducer, useEffect } from 'react';
import { cartReducer, CartState, DispatchObject } from './reducer';


const initialCartState: CartState = {
  items: [],
};

// Tipo del contexto
interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<DispatchObject>;
}

// Crear el contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (initial) => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? { items: JSON.parse(savedCart) } : initial;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
