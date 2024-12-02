'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CartItem } from 'i/lib/type';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (item: CartItem) => {
    return;
  },
  removeFromCart: (item: CartItem) => {
    return;
  },
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.product.product_id === item.product.product_id &&
          cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex]!,
          quantity: updatedCart[existingItemIndex]!.quantity + item.quantity
        };
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart(cart.filter((cartItem) => cartItem.product.product_id !== item.product.product_id));
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};
