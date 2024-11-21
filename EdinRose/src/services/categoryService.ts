import { Category } from '@/types/Category';

const API_BASE_URL = 'https://dummyjson.com';

const mapCategory = (data: unknown): Category[] => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (
        typeof item === 'object' &&
        item !== null &&
        'slug' in item &&
        'name' in item &&
        'url' in item
      ) {
        return {
          slug: String(item.slug),
          name: String(item.name),
          url: String(item.url),
        };
      }
      throw new Error('Datos de categoría inválidos.');
    });
  }
  throw new Error('Formato de respuesta inválido.');
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    // Verificar el estado HTTP
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    return mapCategory(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener categorías:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Error desconocido al obtener categorías:', error);
      throw new Error('Ocurrió un error inesperado al obtener las categorías.');
    }
  }
};
