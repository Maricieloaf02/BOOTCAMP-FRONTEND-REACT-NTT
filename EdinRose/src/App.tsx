import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from './module-routes'; // Importamos el enum
import ShopPage from '@/pages/ShopPage';
import CartPage from '@/pages/CartPage';
import CheckoutDetailsPage from '@/pages/CheckoutDetailsPage';
import ErrorModal from '@/shared/components/ErrorModal';
import OrderCompletePage from './pages/OrderCompletePage';

const App: React.FC = () => {
  return (
    <div>
      <ErrorModal />
      <Routes>
        <Route path={AppRoutes.SHOP} element={<ShopPage />} />
        <Route path={AppRoutes.CART} element={<CartPage />} />
        <Route path={AppRoutes.CHECKOUT} element={<CheckoutDetailsPage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<Navigate to={AppRoutes.SHOP} />} />
        <Route path={AppRoutes.ORDER_COMPLETE} element={<OrderCompletePage />} />
      </Routes>
    </div>
  );
};

export default App;
