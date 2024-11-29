// src/components/Navbar/Navbar.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { CartProvider } from '@/app/context/CartContext';
import { MemoryRouter } from 'react-router-dom';

// Mock para la función de búsqueda
const mockOnSearch = jest.fn();

describe('Navbar', () => {
  it('should render navbar with cart count and search functionality', async () => {
    // Mock del estado del carrito
    const mockCartState = {
      items: [{ id: 1, name: 'Product 1', quantity: 2 }], // Dos productos en el carrito
      orderDetails: null,
    };

    // Renderizar el componente con el estado simulado del carrito
    render(
      <MemoryRouter>
        <CartProvider value={{ state: mockCartState, dispatch: jest.fn(), clearCart: jest.fn(), setOrderDetails: jest.fn() }}>
          <Navbar onSearch={mockOnSearch} />
        </CartProvider>
      </MemoryRouter>
    );

    // Verificar que los elementos estén en el DOM
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
    expect(screen.getByText('EdinRose')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // El carrito tiene 2 productos

    // Simular cambio en el campo de búsqueda
    fireEvent.change(screen.getByPlaceholderText('Search for products...'), { target: { value: 'New Search' } });

    // Verificar que la función de búsqueda fue llamada
    expect(mockOnSearch).toHaveBeenCalledWith('New Search');
  });
});
