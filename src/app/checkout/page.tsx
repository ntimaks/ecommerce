'use client';

import CheckoutPage from 'i/components/CheckoutPage';
import convertToSubcurrency from 'i/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from 'i/components/Cart/providers/CartProvider';
import CartDisplay from 'i/components/Cart/CartDisplay';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

export default function Page() {
  const { cart, updateCart, removeFromCart, calculateTotal } = useCart();

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-10 py-36">
      {/* <CartDisplay /> */}
      <div className="container">
        <div className="flex w-full max-w-full flex-row gap-6 overflow-x-auto p-4">
          {cart.map((item) => (
            <div key={item.product.product_id} className="flex w-[calc(50%-.75rem)] flex-shrink-0 rounded-sm shadow-lg">
              <Image src={item.image ?? ''} alt={item.product.name} width={200} height={200} className="w-1/2" />

              <div className="flex flex-col gap-2 p-2">
                <h1 className="text-lg font-bold">{item.product.name}</h1>
                <div className="flex flex-col gap-2">
                  {/* Left Side: Description, Stock,  */}
                  <div className="flex w-full flex-col gap-2">
                    <p className="">{item.product.description}</p>
                    <p className="font-semibold">In Stock</p>
                  </div>
                  {/* Right Side: Price, Size, Quanity, Total  */}
                  <div className="flex w-full flex-col gap-2">
                    <p>
                      <strong>Item Price:</strong> ${item.product.price}
                    </p>
                    <p>
                      <strong>Size:</strong> {item.size}
                    </p>
                    <div className="flex items-center gap-2">
                      <strong>Quantity:</strong>
                      <button onClick={() => updateCart(item, 'decrement')}>
                        <Minus />
                      </button>
                      {item.quantity}
                      <button onClick={() => updateCart(item, 'increment')}>
                        <Plus />
                      </button>
                    </div>
                    <p>
                      <strong>Total:</strong> ${calculateTotal(item).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className="flex w-full items-center justify-center border border-black"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
