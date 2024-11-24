import { Product } from '@/domain/Product';

export interface CartItem extends Product {
  quantity: number;
}
