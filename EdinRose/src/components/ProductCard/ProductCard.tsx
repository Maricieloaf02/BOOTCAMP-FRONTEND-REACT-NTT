import React from 'react';
import styles from './ProductCard.module.css';
import { Product } from '@/domain/Product';
import { useCart } from '@/context/useCart';
import { CartActions } from '@/domain/actions';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart(); // Usamos `dispatch` para enviar acciones al reducer

  const handleAddToCart = () => {
    dispatch({
      type: CartActions.AddToCart,
      payload: { ...product, quantity: 1 }, // Enviamos el producto con cantidad inicial 1
    });
  };

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
        onClick={handleAddToCart} // Usamos el nuevo manejador para agregar al carrito
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
