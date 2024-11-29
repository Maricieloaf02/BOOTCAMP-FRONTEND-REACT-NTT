import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/useCart'; // Importa el hook del carrito
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import styles from './OrderCompletePage.module.css';

const OrderCompletePage: React.FC = () => {
  const { clearCart } = useCart(); // Usa la función para limpiar el carrito
  const navigate = useNavigate();

  useEffect(() => {
    // Limpia el carrito al montar el componente
    clearCart();

    // Redirige a la página principal después de 7 segundos
    // por qu'e timeout???
    const timer = setTimeout(() => {
      // usar enum
      navigate('/shop');
    }, 7000);

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []); // ✅ Vacía las dependencias para evitar ciclos infinitos

  return (
    <div className={styles['order-complete']}>
      {/* Progreso del pedido */}
      <OrderProgress
        currentStep={3} // Paso actual: "Order Complete"
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      {/* Mensaje de confirmación */}
      <div className={styles['order-complete__content']}>
        <h1 className={styles['order-complete__title']}>Complete!</h1>
        <p className={styles['order-complete__subtitle']}>Thank you! 🎉</p>
        <p className={styles['order-complete__message']}>
          Your order has been received. You will be redirected shortly.
        </p>
      </div>
    </div>
  );
};

export default OrderCompletePage;
