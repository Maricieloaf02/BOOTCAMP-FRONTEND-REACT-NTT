import { CartActions } from '@/domain/actions';
import { CartItem } from '@/domain/CartItem';

export type CartState = {
  items: CartItem[];
};

type CartActionPayload =
  | { type: CartActions.AddToCart; payload: CartItem }
  | { type: CartActions.RemoveFromCart; payload: { id: number } }
  | { type: CartActions.UpdateQuantity; payload: { id: number; quantity: number } }
  | { type: CartActions.ClearCart; payload?: null };


export type DispatchObject = CartActionPayload;

export const cartReducer = (state: CartState, action: DispatchObject): CartState => {
  switch (action.type) {
    case CartActions.AddToCart: {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          // podr'iamos usar llaves para mejorar la lectura
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case CartActions.RemoveFromCart: {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case CartActions.UpdateQuantity: {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CartActions.ClearCart:
      return { ...state, items: [] };

    default:
      return state;
  }
};
