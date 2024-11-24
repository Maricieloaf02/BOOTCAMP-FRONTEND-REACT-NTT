import React from 'react';
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import CartTable from '@/components/CartTable';
import styles from './CartPage.module.css';

const CartPage: React.FC = () => {
  return (
    <div className={styles.cartPage}>
      {/* Progreso del pedido */}
      <OrderProgress
        currentStep={1}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles.cartContent}>
        {/* Tabla del carrito */}
        <CartTable />
      </div>
    </div>
  );
};

export default CartPage;
