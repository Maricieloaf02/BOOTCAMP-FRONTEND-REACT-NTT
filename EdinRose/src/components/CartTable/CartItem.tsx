import React from 'react';
import { CartItem as CartItemType } from '@/domain/CartItem'; // Usa la interfaz CartItem
import { useCart } from '@/context/useCart';
import styles from './CartTable.module.css';

interface CartItemProps {
  product: CartItemType; // Cambiado de Product a CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  // Incrementar cantidad
  const handleIncrease = () => {
    updateQuantity(product.id, product.quantity + 1);
  };

  // Decrementar cantidad
  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  // Eliminar producto
  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <tr className={styles['cart-item']}>
      <td>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles['cart-item__image']}
        />
      </td>
      <td>{product.title}</td>
      <td>
        <div className={styles['cart-item__quantity']}>
          <button onClick={handleDecrease}>-</button>
          <span>{product.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </td>
      <td>${product.price.toFixed(2)}</td>
      <td>${(product.price * product.quantity).toFixed(2)}</td>
      <td>
        <button onClick={handleRemove} className={styles['cart-item__remove']}>
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
