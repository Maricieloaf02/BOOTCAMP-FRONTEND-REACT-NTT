import React from 'react';
import { useCart } from '@/context/useCart';
import CartItem from './CartItem';
import styles from './CartTable.module.css';

const CartTable: React.FC = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <p className={styles['cart-empty']}>Tu carrito está vacío.</p>;
  }

  return (
    <table className={styles['cart-table']}>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
