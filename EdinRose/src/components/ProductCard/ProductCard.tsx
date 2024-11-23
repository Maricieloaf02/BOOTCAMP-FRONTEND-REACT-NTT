import React from 'react';
import styles from './ProductCard.module.css';
import { Product } from '@/domain/Product';
import { useCart } from '@/context/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className={styles['product-card']}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles['product-card__image']}
      />
      <div className={styles['product-card__details']}>
        <h3 className={styles['product-card__title']}>{product.title}</h3>
        <p className={styles['product-card__price']}>${product.price.toFixed(2)}</p>
      </div>
      <button
        className={styles['product-card__button']}
        onClick={() => addToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
