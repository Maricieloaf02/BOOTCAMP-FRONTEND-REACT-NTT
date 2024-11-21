// Representa los datos recibidos directamente de la API
export interface CategoryApiResponse {
  name: string; // Solo devuelve el nombre como string
}

// Representa los datos que usamos en la aplicación después de mapearlos
export interface Category {
  slug: string;
  name: string;
  url: string;
}

