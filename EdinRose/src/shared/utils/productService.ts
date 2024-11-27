import { Product } from '@/domain/Product';

// esto podr'ia estar en una variable global
const API_BASE_URL = import.meta.env.VITE_API_URL;  

export const fetchProducts = async (
  page: number,
  limit: number,
  category?: string,
  query?: string
): Promise<{ products: Product[]; total: number }> => {
  // por qu'e -1?
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

    const data: { products: Product[]; total: number } = await response.json();

    // esta l'ogica podr'ia estar en el mapper
    let filteredProducts = data.products;
    if (query) {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

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