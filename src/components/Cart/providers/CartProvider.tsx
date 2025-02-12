'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { CartItem, FetchCartResponse, ProductDB, ProductResponse, ProductType } from 'i/lib/type';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  calculateTotal: (item?: CartItem) => number;
  addingToCart: boolean;
  updateCart: (item: CartItem, change: 'increment' | 'decrement') => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [] as CartItem[],
  addToCart: (item: CartItem) => {
    return;
  },
  removeFromCart: (item: CartItem) => {
    return;
  },
  calculateTotal: (item?: CartItem) => {
    return 0;
  },
  addingToCart: false,
  updateCart: (item: CartItem, change: 'increment' | 'decrement') => {
    return;
  },
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
      const new_user_id = '3a385f39-35a2-45da-87e3-cb35d518a88d';
      localStorage.setItem('user_id', new_user_id);
      setUser_id(new_user_id);
    } else {
      if (!stored_cart_id || !cart_id) {
        const new_cart_id = crypto.randomUUID();
        localStorage.setItem('cart_id', new_cart_id);
        setCart_id(new_cart_id);
      } else {
        setCart_id(cart_id);
      }
    }

    if (cart_id) {
      setCart_id(cart_id);
    } else {
      setCart_id('7d398fa7-a550-458c-a204-a1874be4c60f');
      localStorage.setItem('cart_id', '7d398fa7-a550-458c-a204-a1874be4c60f');
    }

    const fetchCart = async () => {
      const stored_cart_id = localStorage.getItem('cart_id');
      const stored_user_id = localStorage.getItem('user_id');

      try {
        const res = await fetch(`/api/cart/getCart?cart_id=${stored_cart_id}`);
        const data = (await res.json()) as FetchCartResponse[];

        const cartItems = await Promise.all(
          (data?.[0]?.products || []).map(async (product: ProductType) => {
            const res = await fetch(`/api/products?id=${product.product_id}`);
            const productData = (await res.json()) as ProductResponse;

            if (productData.products[0]) {
              return {
                product: productData.products[0],
                image: productData.products[0].images[0],
                quantity: product.quantity,
                size: product.size,
              };
            } else {
              console.error('Product data is undefined');
              return null;
            }
          })
        );

        // Filter out any null values in case of errors
        const validCartItems = cartItems.filter((item) => item !== null) as CartItem[];

        setCart(validCartItems);
        setIsCartFetched(true);
      } catch (error) {
        console.error('Failed to fetch cart', error);
      }
    };

    fetchCart().catch(console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.product.product_id === item.product.product_id && cartItem.size === item.size
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex]!,
          quantity: updatedCart[existingItemIndex]!.quantity + item.quantity,
        };
      } else {
        updatedCart = [...prevCart, item];
      }

      // Update the cart in the database
      updateCartInDB(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (cartItem) => cartItem.product.product_id !== item.product.product_id || cartItem.size !== item.size
      );

      // Update the cart in the database
      updateCartInDB(updatedCart);
      return updatedCart;
    });
  };

  function updateCart(item: CartItem, change: 'increment' | 'decrement') {
    if (change === 'increment') {
      item.quantity++;
    } else if (change === 'decrement') {
      if (item.quantity === 1) {
        removeFromCart(item);
      } else {
        item.quantity--;
      }
    }
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.product.product_id === item.product.product_id && cartItem.size === item.size
          ? { ...cartItem, quantity: item.quantity }
          : cartItem
      );
      updateCartInDB(updatedCart);
      return updatedCart;
    });
  }

  const updateCartInDB = async (updatedCart: CartItem[]) => {
    const stored_user_id = localStorage.getItem('user_id');
    const stored_cart_id = localStorage.getItem('cart_id');

    const cart_body_items = updatedCart.map((item) => {
      return {
        product_id: item.product.product_id,
        quantity: item.quantity,
        size: item.size,
      };
    });

    const cart_body = {
      cart_id: stored_cart_id,
      products: cart_body_items,
      user_id: stored_user_id,
    };

    try {
      await fetch(`/api/cart/updateCart?cart_id=${stored_cart_id}`, {
        method: 'PUT',
        body: JSON.stringify(cart_body),
      });
    } catch (error) {
      console.error('Failed to update cart in DB', error);
    }
  };

  const calculateTotal = (item?: CartItem) => {
    if (!item) {
      const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      return total > 0 ? total : 1; // Ensure total is always greater than 0 to avoid IntegrationError
    } else {
      return item.product.price * item.quantity;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal, addingToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
