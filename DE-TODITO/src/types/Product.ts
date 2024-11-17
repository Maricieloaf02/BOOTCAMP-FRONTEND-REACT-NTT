export interface Product {
  name: string;
  price: number;
  image: string;
  category?: string;
}

export interface RawProduct {
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}
