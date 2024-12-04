import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '@/app/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // Obtener el token desde localStorage

  if (!token) {
    // Si no hay token, redirigir al Login
    return <Navigate to={AppRoutes.LOGIN} />;
  }

  // Si hay token, renderizar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
