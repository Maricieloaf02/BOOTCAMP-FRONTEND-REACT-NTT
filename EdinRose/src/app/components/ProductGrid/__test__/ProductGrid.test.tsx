/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import ProductGrid from '@/app/components/ProductGrid';
import ProductCard from '@/app/components/ProductCard';
import { productsResponseMock } from '@/app/__mocks__/products';

// Mock para el contexto
const mockDispatch = jest.fn();

jest.mock('@/app/context/useCart', () => ({
  useCart: () => ({
    dispatch: mockDispatch,
  }),
}));

describe('ProductGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente los productos', () => {
    render(
      <ProductGrid>
        {productsResponseMock.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    );

    productsResponseMock.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
    });
  });

  it('debería llamar a la acción de agregar al carrito al hacer clic en un producto', () => {
    const mockProduct = productsResponseMock[0];

    render(
      <ProductGrid>
        <ProductCard product={mockProduct} />
      </ProductGrid>
    );

    const button = screen.getByText(/añadir al carrito/i);
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: { ...mockProduct, quantity: 1 },
    });
  });
});
