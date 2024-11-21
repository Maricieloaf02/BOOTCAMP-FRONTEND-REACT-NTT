export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string; // Si el campo no está en tu API, debería ser opcional
  stock: number;
}
