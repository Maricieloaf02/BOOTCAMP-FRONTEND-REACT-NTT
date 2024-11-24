import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShopPage from '@/pages/ShopPage';
import CartPage from '@/pages/CartPage';
import CheckoutDetailsPage from '@/pages/CheckoutDetailsPage';
import ErrorModal from '@/shared/components/ErrorModal';

const App: React.FC = () => {
  return (
    <div>
      <ErrorModal />
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutDetailsPage />} /> {/* Nueva ruta */}
        <Route path="*" element={<Navigate to="/shop" />} />
      </Routes>
    </div>
  );
};

export default App;
