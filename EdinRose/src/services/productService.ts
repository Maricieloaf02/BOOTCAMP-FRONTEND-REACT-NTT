import  { Product } from '@/types/Product';
export const fetchProducts = async (
  page: number,
  limit: number,
  category?: string,
  query?: string
): Promise<{ products: Product[]; total: number }> => {
  const offset = (page - 1) * limit;

  // URL base para todas las categorías
  const baseUrl = category && category !== ''
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products?limit=200&skip=0`; // Ajusta el límite si puedes

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let filteredProducts = data.products || [];

    // Aplicar búsqueda localmente si hay query
    if (query) {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Realizar paginación local
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return {
      products: paginatedProducts,
      total: filteredProducts.length, // Total después del filtro
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

