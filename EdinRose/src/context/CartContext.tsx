import React, { createContext, ReactNode, useReducer, useEffect } from 'react';
import { cartReducer, CartState, DispatchObject } from './reducer';
import { CartActions } from '@/domain/actions';


const initialCartState: CartState = {
  items: [],
};

// Tipo del contexto
interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<DispatchObject>;
  clearCart: () => void; // Función para limpiar el carrito
}

// Crear el contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // est'a l'ogica del storage no debe estar aqu'i
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (initial) => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? { items: JSON.parse(savedCart) } : initial;
  });

  // esta l'ogica no deber'ia estar en el provider
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Función para limpiar el carrito
  const clearCart = () => {
    dispatch({ type: CartActions.ClearCart }); // Despacha usando el enum
  };
  

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
