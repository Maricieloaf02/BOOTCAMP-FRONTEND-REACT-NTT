import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Selector, { SelectorOption } from '@/components/Selector';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import { fetchProducts } from '@/shared/utils/productService';
import { fetchCategories } from '@/shared/utils/categoryService';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/domain/Product';
import { Category } from '@/domain/Category';
import styles from './ShopPage.module.css';

const itemsPerPage = 10;

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Cargar productos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { products, total } = await fetchProducts(
          currentPage,
          itemsPerPage,
          selectedCategory,
          searchQuery
        );

        setProducts(products);
        setTotalProducts(total);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    loadProducts();
  }, [currentPage, selectedCategory, searchQuery]);

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    loadCategories();
  }, []);

  // Mapear categorías a opciones para el Selector
  const categoryOptions: SelectorOption[] = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    // no n'umeros m'agicos
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles['shop-page']}>
      <Navbar onSearch={handleSearch} />
      <Selector
        options={categoryOptions}
        onChange={handleCategoryChange}
      />
      {error ? (
        <p className={styles['shop-page__error']}>{error}</p>
      ) : (
        <>
          <ProductGrid>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className={styles['product-grid__empty']}>
                No products found. Please try a different search or category.
              </p>
            )}
          </ProductGrid>
          <Pagination
            totalItems={totalProducts}
            itemsPerPage={itemsPerPage}
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
