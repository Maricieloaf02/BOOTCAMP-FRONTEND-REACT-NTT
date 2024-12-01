import { cartReducer, CartState, DispatchObject } from '../cartReducer';
import { CartActions } from '@/app/domain/actions';
import { cartItemsMock } from '@/app/__mocks__/cartItems';

const emptyState: CartState = {
  items: [],
  orderDetails: null,
};

const mockOrderDetails = {
  contactData: {
    firstName: 'mari',
    lastName: 'anchahua',
    phone: '012345789',
  },
  shippingData: {
    address: '123 Main St',
    district: 'Downtown',
    reference: 'Near the park',
  },
};

describe('cartReducer', () => {
  it('debería agregar un producto al carrito con la acción AddToCart', () => {
    const action: DispatchObject = {
      type: CartActions.AddToCart,
      payload: cartItemsMock[0],
    };

    const newState = cartReducer(emptyState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(cartItemsMock[0]);
  });

  it('debería incrementar la cantidad de un producto existente con AddToCart', () => {
    const stateWithItem: CartState = {
      ...emptyState,
      items: [cartItemsMock[0]],
    };

    const action: DispatchObject = {
      type: CartActions.AddToCart,
      payload: { ...cartItemsMock[0], quantity: 2 },
    };

    const newState = cartReducer(stateWithItem, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(3); // 1 (inicial) + 2 (nuevo)
  });

  it('debería eliminar un producto del carrito con RemoveFromCart', () => {
    const stateWithItems: CartState = {
      ...emptyState,
      items: cartItemsMock,
    };

    const action: DispatchObject = {
      type: CartActions.RemoveFromCart,
      payload: { id: cartItemsMock[0].id },
    };

    const newState = cartReducer(stateWithItems, action);

    expect(newState.items).toHaveLength(cartItemsMock.length - 1);
    expect(newState.items.find((item) => item.id === cartItemsMock[0].id)).toBeUndefined();
  });

  it('debería actualizar la cantidad de un producto con UpdateQuantity', () => {
    const stateWithItems: CartState = {
      ...emptyState,
      items: cartItemsMock,
    };

    const action: DispatchObject = {
      type: CartActions.UpdateQuantity,
      payload: { id: cartItemsMock[0].id, quantity: 5 },
    };

    const newState = cartReducer(stateWithItems, action);

    const updatedItem = newState.items.find((item) => item.id === cartItemsMock[0].id);
    expect(updatedItem).toBeDefined();
    expect(updatedItem!.quantity).toBe(5);
  });

  it('debería limpiar el carrito con ClearCart', () => {
    const stateWithItems: CartState = {
      ...emptyState,
      items: cartItemsMock,
    };

    const action: DispatchObject = {
      type: CartActions.ClearCart,
    };

    const newState = cartReducer(stateWithItems, action);

    expect(newState.items).toHaveLength(0);
    expect(newState.orderDetails).toBeNull();
  });

  it('debería establecer los detalles del pedido con SetOrderDetails', () => {
    const action: DispatchObject = {
      type: CartActions.SetOrderDetails,
      payload: mockOrderDetails,
    };

    const newState = cartReducer(emptyState, action);

    expect(newState.orderDetails).toEqual(mockOrderDetails);
  });

  it('debería manejar acciones desconocidas devolviendo el estado original', () => {
    const action = { type: 'UNKNOWN_ACTION' } as unknown as DispatchObject;

    const newState = cartReducer(emptyState, action);

    expect(newState).toEqual(emptyState);
  });
});
