'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CartItem } from 'i/lib/type';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  calculateTotal: () => number;
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

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return total > 0 ? total : 0.01; // Ensure total is always greater than 0 to avoid IntegrationError
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>{children}</CartContext.Provider>;
};
