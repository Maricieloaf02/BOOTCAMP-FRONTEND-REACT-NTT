import { CartItem } from '@/app/domain/CartItem';
import { productsResponseMock } from '@/app/__mocks__/products';

export const cartItemsMock: CartItem[] = productsResponseMock.map(product => ({
  ...product,
  quantity: 1,
}));
