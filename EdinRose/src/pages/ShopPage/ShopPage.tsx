import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CategorySelector from '@/components/CategorySelector';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/services/productService';
import { Product } from '@/types/Product';
import styles from './ShopPage.module.css';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Inicialmente mostramos todos
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocurrió un error al cargar los productos.');
        }
      }
    };

    loadProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === '') {
      setFilteredProducts(products); // Mostrar todos los productos si no hay categoría seleccionada
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  return (
    <div className={styles['shop-page']}>
      <Navbar />
      <CategorySelector onSelectCategory={handleCategoryChange} />
      {error ? (
        <p className={styles['shop-page__error']}>{error}</p>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ShopPage;
