// test de rutas?
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from './app/routes';
import ShopPage from '@/app/pages/ShopPage';
import CartPage from '@/app/pages/CartPage';
import CheckoutDetailsPage from '@/app/pages/CheckoutDetailsPage';
import ErrorModal from '@/shared/components/ErrorModal';
import OrderCompletePage from '@/app/pages/OrderCompletePage';

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
