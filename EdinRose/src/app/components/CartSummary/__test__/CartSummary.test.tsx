import { render, screen, fireEvent } from '@testing-library/react';
import { useCart } from '@/app/context/useCart';
import { useNavigate } from 'react-router-dom';
import CartSummary from '@/app/components/CartSummary';
import { AppRoutes } from '@/app/routes';

jest.mock('@/app/context/useCart', () => ({
  useCart: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CartSummary', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('debería renderizar correctamente', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: { items: [] }, // Carrito vacío
    });

    render(<CartSummary />);

    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('debería mostrar el total correctamente', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: {
        items: [
          { price: 10.5, quantity: 2 },
          { price: 20, quantity: 1 },
        ],
      },
    });

    render(<CartSummary />);
    expect(screen.getByText('$41.00')).toBeInTheDocument();
  });

  it('debería navegar a la página de pago al hacer clic en el botón', () => {
    (useCart as jest.Mock).mockReturnValue({
      state: {
        items: [{ price: 10, quantity: 1 }],
      },
    });

    render(<CartSummary />);
    fireEvent.click(screen.getByText('Checkout'));

    expect(mockNavigate).toHaveBeenCalledWith(AppRoutes.CHECKOUT);
  });
});
