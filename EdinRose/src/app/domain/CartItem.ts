import { Product } from '@/app/domain/Product';

export interface CartItem extends Product {
  quantity: number;
}
