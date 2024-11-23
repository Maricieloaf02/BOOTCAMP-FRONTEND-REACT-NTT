import React, { forwardRef, ReactNode } from 'react';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  children: ReactNode; // Recibe lo que sea renderizado dentro del grid
}

const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(({ children }, ref) => {
  return (
    <div ref={ref} className={styles['product-grid']}>
      {children}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid'; // Importante para depuración con forwardRef

export default ProductGrid;
