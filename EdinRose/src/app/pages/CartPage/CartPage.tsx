// test?
import React from 'react';
import OrderProgress from '@/app/components/OrderProgress/OrderProgress';
import CartTable from '@/app/components/CartTable';
import styles from './CartPage.module.css';
import CartSummary from '@/app/components/CartSummary';

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
