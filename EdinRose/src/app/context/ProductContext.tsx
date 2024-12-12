// test?
import React, { createContext, ReactNode, useReducer } from 'react';
import {
  productReducer,
  initialProductState,
  ProductState,
  ProductAction,
  ProductActions,
} from './productReducer';
import { Product } from '@/app/domain/Product';

interface ProductContextProps {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  const fetchProducts = (products: Product[]) => {
    dispatch({ type: ProductActions.SetProducts, payload: products });
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
