import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './app/context/CartContext';
import { ProductProvider } from './app/context/ProductContext';
import { ErrorProvider } from './app/context/ErrorContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
