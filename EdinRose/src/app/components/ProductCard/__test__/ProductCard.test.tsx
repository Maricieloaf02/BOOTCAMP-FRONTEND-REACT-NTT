/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/app/components/ProductCard';
import { productsResponseMock } from '@/app/__mocks__/products';

// Mock para el contexto
const mockDispatch = jest.fn();

jest.mock('@/app/context/useCart', () => ({
  useCart: () => ({
    dispatch: mockDispatch,
  }),
}));

const mockProduct = productsResponseMock[0];

describe('ProductCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente los detalles del producto', () => {
    render(<ProductCard product={mockProduct} />);

    const title = screen.getByText(mockProduct.title);
    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    const image = screen.getByAltText(mockProduct.title);

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('debería llamar a dispatch con la acción correcta al hacer clic en "Añadir al carrito"', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByText(/añadir al carrito/i);
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: { ...mockProduct, quantity: 1 },
    });
  });
});
