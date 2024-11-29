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
