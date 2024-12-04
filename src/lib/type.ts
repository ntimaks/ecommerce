export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
export interface Rating {
  rate: number;
  count: number;
}

export interface ProductDB {
  _id: string;
  product_id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  inventory: Stock[];
  reviews: Review[];
}

export interface Stock {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  quantity: number;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
}

export interface CartItem {
  product: ProductDB;
  image: string | undefined;
  quantity: number;
  size: Stock['size'];
}

export interface FetchCartResponse {
  cart_id: string;
  products: ProductType[];
  user_id: string;
  _id: string;
}

export interface ProductType {
  product_id: string;
  quantity: number;
  size: Stock['size'];
}
