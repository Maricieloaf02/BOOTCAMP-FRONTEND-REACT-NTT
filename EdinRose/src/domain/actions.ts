export const enum CartActions {
  AddToCart = "ADD_TO_CART",
  RemoveFromCart = "REMOVE_FROM_CART",
  UpdateQuantity = "UPDATE_QUANTITY",
  ClearCart = "CLEAR_CART",
  SetOrderDetails = 'SET_ORDER_DETAILS',
}

export const enum ProductActions {
  LoadProducts = "LOAD_PRODUCTS",
  FilterProducts = "FILTER_PRODUCTS",
  SetError = "SET_ERROR",
}

export type AppActions = CartActions | ProductActions;
