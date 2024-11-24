import React from 'react';
import { useCart } from '@/context/useCart'; 
import { useNavigate } from 'react-router-dom';
import styles from './CartSummary.module.css';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate(); // Hook para redirigir
  const cartItems = state.items;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles['cart-summary']}>
      <h2 className={styles['cart-summary__title']}>Cart Summary</h2>
      <div className={styles['cart-summary__total']}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        className={styles['cart-summary__button']}
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
