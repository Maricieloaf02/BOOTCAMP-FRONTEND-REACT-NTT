import { useState, useEffect } from 'react';
import { Product } from '@/app/domain/Product';
import { fetchProducts } from '@/shared/utils/productService';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const { products } = await fetchProducts(DEFAULT_PAGE, DEFAULT_LIMIT);
        setProducts(products);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
