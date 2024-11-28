import { Product } from '@/domain/Product';

export type ProductState = {
  products: Product[];
  filteredProducts: Product[];
  search: string;
  category: string;
};

export const initialProductState: ProductState = {
  products: [],
  filteredProducts: [],
  search: '',
  category: '',
};

export enum ProductActions {
  SetProducts = 'SET_PRODUCTS',
  SetSearch = 'SET_SEARCH',
  SetCategory = 'SET_CATEGORY',
  FilterProducts = 'FILTER_PRODUCTS',
}

export type ProductAction =
  | { type: ProductActions.SetProducts; payload: Product[] }
  | { type: ProductActions.SetSearch; payload: string }
  | { type: ProductActions.SetCategory; payload: string }
  | { type: ProductActions.FilterProducts };

export const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ProductActions.SetProducts:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };

    case ProductActions.SetSearch:
      return { ...state, search: action.payload };

    case ProductActions.SetCategory:
      return { ...state, category: action.payload };

    case ProductActions.FilterProducts: {
      let filtered = state.products;

      if (state.search) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }

      if (state.category) {
        filtered = filtered.filter((product) => product.category === state.category);
      }

      return { ...state, filteredProducts: filtered };
    }

    default:
      return state;
  }
};
