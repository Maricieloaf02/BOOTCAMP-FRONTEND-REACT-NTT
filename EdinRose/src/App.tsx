import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importamos las herramientas de enrutamiento
import ShopPage from '@/pages/ShopPage';
import CartPage from '@/pages/CartPage';
import ErrorModal from '@/shared/components/ErrorModal';

const App: React.FC = () => {
  return (
    <div>
      {/* Componente para mostrar errores globales */}
      <ErrorModal />
      
      {/* Configuración de rutas */}
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/shop" />} /> {/* Redirección por defecto */}
      </Routes>
    </div>
  );
};

export default App;
