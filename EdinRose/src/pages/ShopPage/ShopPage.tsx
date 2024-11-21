import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CategorySelector from '@/components/CategorySelector';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import { fetchProducts } from '@/services/productService';
import { Product } from '@/types/Product';
import styles from './ShopPage.module.css';

const ITEMS_PER_PAGE = 10;

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Filtro de categoría
  const [searchQuery, setSearchQuery] = useState<string>(''); // Búsqueda por texto
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { products, total } = await fetchProducts(
          currentPage,
          ITEMS_PER_PAGE,
          selectedCategory,
          searchQuery
        );

        setProducts(products);
        setTotalProducts(total); // Total actualizado según el filtro
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocurrió un error al cargar los productos.');
        }
      }
    };

    loadProducts();
  }, [currentPage, selectedCategory, searchQuery]); // Dependencias incluyen búsqueda, categoría y página

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Reiniciar búsqueda al cambiar de categoría
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reiniciar a la primera página
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles['shop-page']}>
      <Navbar onSearch={handleSearch} /> {/* Maneja la búsqueda */}
      <CategorySelector onSelectCategory={handleCategoryChange} /> {/* Maneja la categoría */}
      {error ? (
        <p className={styles['shop-page__error']}>{error}</p>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination
            totalItems={totalProducts}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            visibleRange={5}
          />
        </>
      )}
    </div>
  );
};

export default ShopPage;
