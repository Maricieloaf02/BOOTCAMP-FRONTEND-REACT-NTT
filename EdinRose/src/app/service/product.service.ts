import { Product } from '@/app/domain/Product';
import { API_BASE_URL } from '@/config';
import { filterProductsByQuery } from '@/shared/utils/productMapper';

export const fetchProducts = async (
  page: number,
  limit: number,
  category?: string,
  query?: string
): Promise<{ products: Product[]; total: number }> => {
  const offset = (page - 1) * limit; // Convertir página en índice del array

  const baseUrl = category && category !== ''
    ? `${API_BASE_URL}/products/category/${category}`
    : `${API_BASE_URL}/products?limit=200&skip=0`;

  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data: { products: Product[]; total: number } = await response.json();

    const filteredProducts = filterProductsByQuery(data.products, query);

    // Paginación
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};
