import React from 'react';
import './ProductCard.module.css'; // Cambiamos de CSS modules a un archivo global
import { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-card__image"
      />
      <div className="product-card__details">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
      <button className="product-card__button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
