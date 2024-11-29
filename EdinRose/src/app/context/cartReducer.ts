// src/context/cartReducer.ts
import { CartActions } from '@/app/domain/actions';
import { CartItem } from '@/app/domain/CartItem';
import { ContactFormData } from '@/app/domain/ContactForm';
import { ShippingAddressFormData } from '@/app/domain/ShippingAddress';

export type CartState = {
  items: CartItem[];
  orderDetails: {
    contactData: ContactFormData | null;
    shippingData: ShippingAddressFormData | null;
  } | null;
};

type CartActionPayload =
  | { type: CartActions.AddToCart; payload: CartItem }
  | { type: CartActions.RemoveFromCart; payload: { id: number } }
  | { type: CartActions.UpdateQuantity; payload: { id: number; quantity: number } }
  | { type: CartActions.ClearCart }
  | { type: CartActions.SetOrderDetails; payload: CartState['orderDetails'] };

export type DispatchObject = CartActionPayload;

export const cartReducer = (state: CartState, action: DispatchObject): CartState => {
  switch (action.type) {
    case CartActions.AddToCart: {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
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
      return { items: [], orderDetails: null };

    case CartActions.SetOrderDetails:
      return { ...state, orderDetails: action.payload };

    default:
      return state;
  }
};