import { Product } from "./Product";

declare global {
  interface DocumentEventMap {
    "add-to-cart": CustomEvent<{ product: Product }>;
  }
}
