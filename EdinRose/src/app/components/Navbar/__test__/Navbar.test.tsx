import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useCart } from '@/app/context/useCart';
import Navbar from '@/app/components/Navbar';

jest.mock('@/app/context/useCart', () => ({
  useCart: jest.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      state: {
        items: [{ quantity: 2 }, { quantity: 3 }], // Simula 5 productos en el carrito
      },
    });
  });

  it('should render the logo, search bar, and icons', () => {
    render(
      <MemoryRouter>
        <Navbar onSearch={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('EdinRose')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /search/i })).toBeInTheDocument(); // Ícono de búsqueda
  });

  it('should call onSearch with the correct query', () => {
    const onSearchMock = jest.fn();

    render(
      <MemoryRouter>
        <Navbar onSearch={onSearchMock} />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search for products...');
    fireEvent.change(searchInput, { target: { value: 'shoes' } });

    expect(onSearchMock).toHaveBeenCalledWith('shoes');
  });

  it('should display the correct cart count', () => {
    render(
      <MemoryRouter>
        <Navbar onSearch={jest.fn()} />
      </MemoryRouter>
    );

    const cartCount = screen.getByText('5'); // Basado en el mock del carrito
    expect(cartCount).toBeInTheDocument();
  });

  it('should navigate to the correct routes', () => {
    render(
      <MemoryRouter>
        <Navbar onSearch={jest.fn()} />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole('link', { name: /edinrose/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('should be accessible', () => {
    render(
      <MemoryRouter>
        <Navbar onSearch={jest.fn()} />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search for products...');
    expect(searchInput).toHaveAccessibleName('Search for products...');
  });
});
