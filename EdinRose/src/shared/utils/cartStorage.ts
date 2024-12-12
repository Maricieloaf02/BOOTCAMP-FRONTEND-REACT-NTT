// test?
// src/shared/utils/cartStorage.ts

const CART_KEY = 'cart';

export const saveCartToStorage = (items: unknown) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const loadCartFromStorage = (): { items: unknown[] } | null => {
  const savedCart = localStorage.getItem(CART_KEY);
  return savedCart ? { items: JSON.parse(savedCart) } : null;
};

export const clearCartFromStorage = () => {
  localStorage.removeItem(CART_KEY);
};
