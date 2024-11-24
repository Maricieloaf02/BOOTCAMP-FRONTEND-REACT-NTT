import React from 'react';
import OrderProgress from '@/components/OrderProgress/OrderProgress';
import CartTable from '@/components/CartTable';
import styles from './CartPage.module.css';
import CartSummary from '@/components/CartSummary';

const CartPage: React.FC = () => {
  return (
    <div className={styles.cartPage}>
      {/* Progreso del pedido */}
      <OrderProgress
        currentStep={1}
        steps={['Shopping cart', 'Checkout details', 'Order complete']}
      />

      <div className={styles['cart-page__content']}>
        <CartTable />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
