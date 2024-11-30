import { Category } from '@/app/domain/Category';
import { mapCategory } from '@/shared/utils/categoryMapper';

const API_BASE_URL = "https://dummyjson.com";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return mapCategory(data);

  } catch (error) {
    console.error('Error capturado en fetchCategories:', error);
    throw error;
  }
};







