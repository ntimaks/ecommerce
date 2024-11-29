'use client';
import Link from 'next/link';
import Hamburger from '../../public/icons/hamburger';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger size={window.innerWidth <= 768 ? 30 : 50} color="black" />
      </SheetTrigger>
      <SheetContent side="left">
        <h1>MENU</h1>

        <Link href="/" className="text-base hover:text-gray-600 transition-colors">
          <p className="text-black">Home</p>
        </Link>
        <Link href="/store" className="text-base hover:text-gray-600 transition-colors">
          <p className="text-black">Store</p>
        </Link>


      </SheetContent>
    </Sheet>
  );
}
