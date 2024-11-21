import React from 'react';
import styles from './ProductGrid.module.css';
import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className={styles['product-grid']}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Pasamos `product` como prop
        ))
      ) : (
        <p className={styles['product-grid__empty']}>
          No products found. Please try a different search or category.
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
