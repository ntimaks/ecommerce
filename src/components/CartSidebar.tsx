'use client';

import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import Link from 'next/link';
import Cart from '../../public/icons/cart';
import CartDisplay from './Cart/CartItem';
import type { CartItem as CartItemType } from 'i/lib/type';
import { useCart } from './Cart/providers/CartProvider';
import Checkout from './Checkout';
export default function CartSidebar() {
  const { cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger >
        <Cart color="black" size={50} className="origin-top-right scale-[.60] lg:scale-100" />
      </SheetTrigger>
      <SheetContent side="right" className="min-w-[550px] pt-10">
        <h1 className="text-lg font-bold">Shopping Cart</h1>
        <CartDisplay />
        <Checkout />
      </SheetContent>
    </Sheet>
  );
}
