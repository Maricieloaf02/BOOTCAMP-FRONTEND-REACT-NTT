import React from 'react';
import { useCart } from '@/context/useCart';
import CartItem from './CartItem';
import styles from './CartTable.module.css';

const CartTable: React.FC = () => {
  const { state } = useCart();
  const cartItems = state.items;

  if (cartItems.length === 0) {
    return <p className={styles['cart-empty']}>Your cart is empty.</p>;
  }

  return (
    <table className={styles['cart-table']}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
