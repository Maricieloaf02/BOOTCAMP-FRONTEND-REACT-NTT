// src/services/ProductService.ts
import { Product, RawProduct } from "../types/Product";

const productMapper = (raw: RawProduct): Product => ({
  name: raw.title,
  price: raw.price,
  image: raw.thumbnail,
  category: raw.category,
});

export class ProductService {
  async fetchProducts(): Promise<Product[]> {
    // la url se repite por lo que podr'ia estar centralizada en un archivo global que se pueda importar o si queremos ir a un siguiente nivel podemos considerar usar variables de entorno
    const response = await fetch("https://dummyjson.com/products?limit=1000");
    // igual aqu'i por qu'e unknown?
    const data: unknown = await response.json();

    // Validación explícita usando unknown
    if (
      typeof data === "object" &&
      data !== null &&
      "products" in data &&
      Array.isArray((data as any).products)
    ) {
      const rawProducts = (data as { products: unknown[] }).products;

      // Validar cada producto
      if (rawProducts.every(isRawProduct)) {
        return rawProducts.map(productMapper);
      }
    }

    throw new Error("La respuesta de la API no tiene el formato esperado");
  }

  async fetchProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data: unknown = await response.json();

    // Validación explícita usando unknown
    if (
      typeof data === "object" &&
      data !== null &&
      "products" in data &&
      Array.isArray((data as any).products)
    ) {
      const rawProducts = (data as { products: unknown[] }).products;

      // Validar cada producto
      if (rawProducts.every(isRawProduct)) {
        return rawProducts.map(productMapper);
      }
    }

    throw new Error("La respuesta de la API no tiene el formato esperado");
  }
}

/**
 * Valida si un objeto desconocido es un `RawProduct`.
 * @param obj Objeto desconocido.
 */
function isRawProduct(obj: unknown): obj is RawProduct {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    "price" in obj &&
    "thumbnail" in obj &&
    "category" in obj &&
    typeof (obj as any).title === "string" &&
    typeof (obj as any).price === "number" &&
    typeof (obj as any).thumbnail === "string" &&
    typeof (obj as any).category === "string"
  );
}
