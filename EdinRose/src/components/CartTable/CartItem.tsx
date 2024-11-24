import React from 'react';
import { CartItem as CartItemType } from '@/domain/CartItem'; 
import { useCart } from '@/context/useCart';
import { CartActions } from '@/domain/actions';
import styles from './CartTable.module.css';

interface CartItemProps {
  product: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleIncrease = () => {
    dispatch({
      type: CartActions.UpdateQuantity,
      payload: { id: product.id, quantity: product.quantity + 1 },
    });
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      dispatch({
        type: CartActions.UpdateQuantity,
        payload: { id: product.id, quantity: product.quantity - 1 },
      });
    }
  };

  const handleRemove = () => {
    dispatch({
      type: CartActions.RemoveFromCart,
      payload: { id: product.id },
    });
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
