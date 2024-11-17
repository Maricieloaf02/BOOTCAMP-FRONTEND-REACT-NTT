// src/services/CategoryService.ts
import { Category } from "../types/Category";

export class CategoryService {
  /**
   * Obtiene las categorías desde la API y las valida.
   * @returns Array de categorías en el formato definido.
   */
  async fetchCategories(): Promise<Category[]> {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data: unknown = await response.json();

    // Validación explícita del formato real de los datos
    if (Array.isArray(data) && data.every(isCategory)) {
      return data;
    }

    // Lanza un error si los datos no tienen el formato esperado
    throw new Error("La respuesta de la API no tiene el formato esperado");
  }
}

/**
 * Valida si un objeto desconocido es un `Category`.
 * @param obj Objeto desconocido.
 */
function isCategory(obj: unknown): obj is Category {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "slug" in obj &&
    "name" in obj &&
    "url" in obj &&
    typeof (obj as any).slug === "string" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).url === "string"
  );
}
