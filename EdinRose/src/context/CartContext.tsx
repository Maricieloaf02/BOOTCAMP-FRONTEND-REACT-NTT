import React, { createContext, ReactNode, useReducer } from 'react';
import { cartReducer, CartState, DispatchObject } from './cartReducer';
import { CartActions } from '@/domain/actions';

const initialCartState: CartState = {
  items: [],
  orderDetails: null,
};

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<DispatchObject>;
  clearCart: () => void;
  setOrderDetails: (orderDetails: CartState['orderDetails']) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const clearCart = () => {
    dispatch({ type: CartActions.ClearCart });
  };

  const setOrderDetails = (orderDetails: CartState['orderDetails']) => {
    dispatch({ type: CartActions.SetOrderDetails, payload: orderDetails });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart, setOrderDetails }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
