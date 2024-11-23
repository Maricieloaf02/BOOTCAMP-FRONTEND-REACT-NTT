import { Product } from '@/domain/Product';

const API_BASE_URL = import.meta.env.VITE_API_URL;  

export const fetchProducts = async (
  page: number,
  limit: number,
  category?: string,
  query?: string
): Promise<{ products: Product[]; total: number }> => {
  const offset = (page - 1) * limit;

  // Construir la URL base
  const baseUrl = category && category !== ''
    ? `${API_BASE_URL}/products/category/${category}`
    : `${API_BASE_URL}/products?limit=200&skip=0`;

  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    // Tipar directamente la respuesta
    const data: { products: Product[]; total: number } = await response.json();

    // Aplicar búsqueda localmente si hay query
    let filteredProducts = data.products;
    if (query) {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Realizar paginación local
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