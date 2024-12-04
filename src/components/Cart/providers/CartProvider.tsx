'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CartItem, FetchCartResponse, ProductDB, ProductType } from 'i/lib/type';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  calculateTotal: () => number;
  addingToCart: boolean;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (item: CartItem) => {
    return;
  },
  removeFromCart: (item: CartItem) => {
    return;
  },
  calculateTotal: () => {
    return 0;
  },
  addingToCart: false,
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user_id, setUser_id] = useState<string | null>(null);
  const [cart_id, setCart_id] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isCartFetched, setIsCartFetched] = useState(false);

  useEffect(() => {
    const stored_user_id = localStorage.getItem('user_id');
    const stored_cart_id = localStorage.getItem('cart_id');

    if (!stored_user_id) {
      const new_user_id = crypto.randomUUID();
      localStorage.setItem('user_id', new_user_id);
      setUser_id(new_user_id);
    }

    if (user_id) {
      if (!stored_cart_id || !cart_id) {
        const new_cart_id = crypto.randomUUID();
        localStorage.setItem('cart_id', new_cart_id);
        setCart_id(new_cart_id);
      } else {
        setCart_id(cart_id);
      }
    }

    const cart_instance: CartItem[] = [];
    async function fetchCart() {
      console.log(stored_cart_id);
      console.log(stored_user_id);
      try {
        const res = await fetch(`/api/cart/getCart?cart_id=${stored_cart_id}`);
        const data = (await res.json()) as FetchCartResponse[];
        try {
          // Cart Instance : ID, Quantity, Size
          const products = data?.[0]?.products.map(async (product: ProductType) => {
            const res = await fetch(`/api/products?id=${product.product_id}`);
            const data = (await res.json()) as ProductDB[];
            console.log('RPPOODDUCTS', data);
            const productData = data[0];
            if (productData) {
              cart_instance.push({
                product: productData,
                image: productData.images[0],
                quantity: product.quantity,
                size: product.size,
              });
            } else {
              console.error('Product data is undefined');
            }
          });

          console.log('CART INSTANCE', cart_instance);
          setCart(cart_instance);
          setIsCartFetched(true);
        } catch (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
    }
    fetchCart().catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Update Cart in DB
  // TODO: Move this into @addToCart below
  useEffect(() => {
    const stored_user_id = localStorage.getItem('user_id');
    const stored_cart_id = localStorage.getItem('cart_id');

    if (!isCartFetched) return;

    const cart_body_items = cart.map((item) => {
      return {
        product_id: item.product.product_id,
        quantity: item.quantity,
        size: item.size,
      };
    });

    console.log('CART BODY ITEMS', cart_body_items);
    const cart_body = {
      cart_id: stored_cart_id,
      products: cart_body_items,
      user_id: stored_user_id,
    };

    const updateCart = async () => {
      const res = await fetch(`/api/cart/updateCart?cart_id=${stored_cart_id}`, {
        method: 'PUT',
        body: JSON.stringify(cart_body),
      });
    };
    updateCart().catch(console.error);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.product.product_id === item.product.product_id && cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex]!,
          quantity: updatedCart[existingItemIndex]!.quantity + item.quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart(cart.filter((cartItem) =>
      cartItem.product.product_id !== item.product.product_id || cartItem.size !== item.size
    ));
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return total > 0 ? total : 1; // Ensure total is always greater than 0 to avoid IntegrationError
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal, addingToCart }}>
      {children}
    </CartContext.Provider>
  );
};
