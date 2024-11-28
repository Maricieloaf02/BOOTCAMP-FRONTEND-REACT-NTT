import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/useCart';
import { AppRoutes } from '@/module-routes';
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import styles from './OrderCompletePage.module.css';

const OrderCompletePage: React.FC = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    if (!hasCleared) {
      clearCart(); 
      setHasCleared(true);
    }
  }, [clearCart, hasCleared]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(AppRoutes.SHOP);
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles['order-complete']}>
      <OrderProgress
        currentStep={3}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />
      <div className={styles['order-complete__content']}>
        <h1 className={styles['order-complete__title']}>Complete!</h1>
        <p className={styles['order-complete__subtitle']}>Thank you! 🎉</p>
        <p className={styles['order-complete__message']}>
          Your order has been received. You will be redirected to the shop.
        </p>
      </div>
    </div>
  );
};

export default OrderCompletePage;
