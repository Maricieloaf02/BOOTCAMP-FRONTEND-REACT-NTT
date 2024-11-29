import { Category } from '@/app/domain/Category';
import { mapCategory } from '@/shared/utils/categoryMapper';

const API_BASE_URL = "https://dummyjson.com";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data: Category[] = await response.json();
    return mapCategory(data);
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
