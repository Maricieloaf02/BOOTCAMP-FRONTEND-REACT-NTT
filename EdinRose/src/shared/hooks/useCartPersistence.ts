// src/shared/hooks/useCartPersistence.ts

import { useEffect } from 'react';
import { saveCartToStorage } from '@/shared/utils/cartStorage';
import { CartItem } from '@/domain/CartItem';

/**
 * Hook personalizado para manejar la persistencia del carrito.
 * @param items - Lista de elementos en el carrito
 */
const useCartPersistence = (items: CartItem[]) => {
  useEffect(() => {
    saveCartToStorage(items); // Guarda los items en localStorage
  }, [items]);
};

export default useCartPersistence;
