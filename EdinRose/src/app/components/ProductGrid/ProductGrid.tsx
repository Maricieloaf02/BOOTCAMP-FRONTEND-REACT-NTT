import  { forwardRef, ReactNode } from 'react';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  children: ReactNode;
}

const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(({ children }, ref) => {
  return (
    <div ref={ref} className={styles['product-grid']}>
      {children}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
