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
    phone: '012345789', // ❌ Eliminamos "email"
  },
  shippingData: {
    address: '123 Main St',
    district: 'Downtown', // ✅ Cambiado para coincidir con "district"
    reference: 'Near the park', // ✅ Cambiado para coincidir con "reference"
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

  it('debería manejar acciones desconocidas devolviendo el estado original', () => {
    const action = { type: 'UNKNOWN_ACTION' } as unknown as DispatchObject;
    const newState = cartReducer(emptyState, action);
    expect(newState).toEqual(emptyState);
  });

  it('debería establecer los detalles del pedido con SetOrderDetails', () => {
    const action: DispatchObject = {
      type: CartActions.SetOrderDetails,
      payload: mockOrderDetails, // El mock coincide exactamente con las interfaces
    };
  
    const newState = cartReducer(emptyState, action);
  
    expect(newState.orderDetails).toEqual(mockOrderDetails);
  });
  
});
