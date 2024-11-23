import { Category } from '@/domain/Category';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const mapCategory = (data: Category[]): Category[] => {
  return data.map((item) => ({
    slug: String(item.slug),
    name: String(item.name),
    url: String(item.url),
  }));
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    // Tipar directamente el resultado como un array de categorías
    const data: Category[] = await response.json();
    return mapCategory(data); // Aplicar mapeo si es necesario
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al obtener categorías:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Error desconocido al obtener categorías:', error);
      throw new Error('Ocurrió un error inesperado al obtener las categorías.');
    }
  }
};
