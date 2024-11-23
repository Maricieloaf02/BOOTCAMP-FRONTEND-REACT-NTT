import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Opcional, estilos globales
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { ErrorProvider } from './context/ErrorContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </ErrorProvider>
  </React.StrictMode>
);
