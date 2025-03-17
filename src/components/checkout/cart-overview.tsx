'use client';

import { CartDropdownItem } from 'i/components/layout/navbar/cart-dropdown-item';
import { useCart } from 'i/components/Cart/providers/CartProvider';
import { useState } from 'react';
import CheckoutModal from '../Cart/CheckoutModal';

export default function CartOverview() {
  const { cart, calculateTotal } = useCart();
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);
  const total = calculateTotal() + shipping + tax;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Cart Info</h1>
      <div className="flex flex-col justify-between gap-4 rounded-[20px] border border-smoke bg-smoke/50 p-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4 overflow-y-auto">
          {cart.map((item, index) => (
            <CartDropdownItem key={index} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <article className="grid grid-cols-2 gap-y-2 py-1">
            <hr className="col-span-2 border-smoke" />
            <p className="font-bold">Sub-Total: </p>
            <p className="text-right">${calculateTotal().toFixed(2)}</p>
            <p className="font-bold">Shipping: </p>
            <p className="text-right">${shipping}</p>
            <p className="font-bold">Tax: </p>
            <p className="text-right">${tax}</p>
            <hr className="col-span-2 border-smoke" />
            <p className="font-bold">Total: </p>
            <p className="text-right">${total.toFixed(2)}</p>
          </article>

          <button
            onClick={() => setOpenCheckout((prev) => !prev)}
            className="w-full rounded-full bg-lime px-4 py-2 font-bold text-black transition-colors duration-300 ease-in-out hover:bg-lime/50"
          >
            Checkout
          </button>
          {openCheckout && <CheckoutModal setIsOpen={setOpenCheckout} amount={Number(total)} />}
        </div>
      </div>
    </div>
  );
}
