import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import styles from './OrderCompletePage.module.css';

const OrderCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5); // Inicializa con 5 segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); // Reduce el tiempo restante
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/shop'); // Redirige después de 5 segundos
    }, 5000);

    // Limpia los temporizadores
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
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
          Your order has been received. Redirecting in {timeLeft} seconds...
        </p>
      </div>
    </div>
  );
};

export default OrderCompletePage;
