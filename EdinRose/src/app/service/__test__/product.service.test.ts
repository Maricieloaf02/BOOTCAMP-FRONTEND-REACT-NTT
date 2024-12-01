import fetchMock from 'jest-fetch-mock';
import { fetchProducts } from '../product.service';
import { productsResponseMock } from '@/app/__mocks__/products';
import { filterProductsByQuery } from '@/shared/utils/productMapper';

jest.mock('@/shared/utils/productMapper', () => ({
  filterProductsByQuery: jest.fn(),
}));

describe('fetchProducts', () => {
  const API_BASE_URL = "https://dummyjson.com";

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería retornar productos paginados correctamente', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: productsResponseMock, total: productsResponseMock.length })
    );

    (filterProductsByQuery as jest.Mock).mockReturnValue(productsResponseMock);

    const result = await fetchProducts(1, 1); // Página 1, 1 producto por página

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products?limit=200&skip=0`);
    expect(filterProductsByQuery).toHaveBeenCalledWith(productsResponseMock, undefined); // Sin query
    expect(result).toEqual({
      products: productsResponseMock.slice(0, 1), // Paginación: el primer producto
      total: productsResponseMock.length,
    });
  });

  it('debería construir la URL correctamente al filtrar por categoría', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: productsResponseMock, total: productsResponseMock.length })
    );

    await fetchProducts(1, 1, 'beauty'); // Filtrar por categoría "beauty"

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products/category/beauty`);
  });

  it('debería manejar errores HTTP correctamente', async () => {
    fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' });

    await expect(fetchProducts(1, 1)).rejects.toThrow('Error HTTP: 500 Internal Server Error');
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products?limit=200&skip=0`);
  });

  it('debería manejar errores de red correctamente', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    await expect(fetchProducts(1, 1)).rejects.toThrow('Network Error');
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products?limit=200&skip=0`);
  });

  it('debería aplicar correctamente el filtro por query', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: productsResponseMock, total: productsResponseMock.length })
    );

    const filteredProductsMock = [productsResponseMock[0]]; // Resultado del filtro con "Mascara"
    (filterProductsByQuery as jest.Mock).mockReturnValue(filteredProductsMock);

    const result = await fetchProducts(1, 1, undefined, 'Mascara'); // Query: "Mascara"

    expect(filterProductsByQuery).toHaveBeenCalledWith(productsResponseMock, 'Mascara');
    expect(result).toEqual({
      products: filteredProductsMock.slice(0, 1), // Primer producto después del filtro
      total: filteredProductsMock.length,
    });
  });
});
