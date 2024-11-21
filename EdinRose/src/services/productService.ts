import { Product } from '@/types/Product';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.products; // La API devuelve un objeto con una propiedad `products`
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener productos:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Error desconocido al obtener productos:', error);
      throw new Error('Ocurrió un error inesperado al obtener los productos.');
    }
  }
};
