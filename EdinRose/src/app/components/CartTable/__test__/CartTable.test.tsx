/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '@/app/context/CartContext';
import CartTable from '@/app/components/CartTable';
import { CartActions } from '@/app/domain/actions';
import { useCart } from '@/app/context/useCart';
import { cartItemsMock } from '@/app/__mocks__/cartItems';

jest.mock('@/app/context/useCart', () => ({
  useCart: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CartTable', () => {
  it('debería mostrar el mensaje "Your cart is empty." si no hay productos en el carrito', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [] },
      dispatch: mockDispatch,
    });

    render(
      <CartProvider>
        <CartTable />
      </CartProvider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('debería renderizar correctamente los productos del carrito', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: { items: cartItemsMock },
      dispatch: mockDispatch,
    });
  
    render(
      <CartProvider>
        <CartTable />
      </CartProvider>
    );
  
    cartItemsMock.forEach((product) => {
      const productTitle = screen.getByText(product.title);
      const productPrices = screen.getAllByText(`$${product.price.toFixed(2)}`);
      expect(productTitle).toBeInTheDocument();
      expect(productPrices.length).toBeGreaterThan(0);
    });
  });
  

  it('debería manejar correctamente el incremento de cantidad', () => {
    const product = cartItemsMock[0];
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [product] },
      dispatch: mockDispatch,
    });

    render(
      <CartProvider>
        <CartTable />
      </CartProvider>
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateQuantity,
      payload: { id: product.id, quantity: product.quantity + 1 },
    });
  });

  it('debería manejar correctamente la disminución de cantidad', () => {
    const product = { ...cartItemsMock[0], quantity: 2 };
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [product] },
      dispatch: mockDispatch,
    });
  
    render(
      <CartProvider>
        <CartTable />
      </CartProvider>
    );
  
    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);
  
    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.UpdateQuantity,
      payload: { id: product.id, quantity: product.quantity - 1 },
    });
  });
  

  it('debería manejar correctamente la eliminación de un producto', () => {
    const product = cartItemsMock[0];
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [product] },
      dispatch: mockDispatch,
    });

    render(
      <CartProvider>
        <CartTable />
      </CartProvider>
    );

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CartActions.RemoveFromCart,
      payload: { id: product.id },
    });
  });
});
