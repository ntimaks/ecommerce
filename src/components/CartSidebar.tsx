'use client';

import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import Link from 'next/link';
import Cart from '../../public/icons/cart';
import CartDisplay from './Cart/CartDisplay';
import type { CartItem as CartItemType } from 'i/lib/type';
import { useCart } from './Cart/providers/CartProvider';
import Checkout from './Checkout';
export default function CartSidebar() {
  const { cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger>
        <Cart color="black" size={50} className="origin-top-right scale-[.60] lg:scale-100" />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full min-w-[550px] flex-col gap-8 pt-10">
        <h1 className="text-lg font-bold">Shopping Cart</h1>
        <CartDisplay />
        {/* {cart.length > 0 ? <Checkout /> : <div>No items in cart!</div>} */}
        <Link
          href="/cart"
          className="w-full rounded-md bg-black px-4 py-2 text-center text-white transition-colors duration-300 hover:cursor-pointer hover:bg-muted-foreground"
        >
          See Cart
        </Link>
      </SheetContent>
    </Sheet>
  );
}
