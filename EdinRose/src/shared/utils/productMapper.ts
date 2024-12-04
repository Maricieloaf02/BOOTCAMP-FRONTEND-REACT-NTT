import { Product } from '@/app/domain/Product';

export const filterProductsByQuery = (products: Product[], query?: string): Product[] => {
  if (!query) return products;

  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
};
