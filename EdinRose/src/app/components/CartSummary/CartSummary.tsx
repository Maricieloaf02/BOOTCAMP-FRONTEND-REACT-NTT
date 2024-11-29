import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/app/context/useCart';
import { AppRoutes } from '@/app/routes'; 
import Button from '@/shared/components/Button/Button';
import styles from './CartSummary.module.css';

const CartSummary: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate(AppRoutes.CHECKOUT);
  };

  return (
    <div className={styles['cart-summary']}>
      <h2 className={styles['cart-summary__title']}>Cart Summary</h2>
      <div className={styles['cart-summary__total']}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button onClick={handleCheckout} fullWidth>
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;