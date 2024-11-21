import React from 'react';
import './ProductGrid.module.css'; // Cambiamos a un archivo CSS global con clases BEM
import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  console.log('Rendering ProductGrid with products:', products); // Validar productos
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="product-grid__empty">
          No products found. Please try a different search or category.
        </p>
      )}
    </div>
  );
};


export default ProductGrid;
