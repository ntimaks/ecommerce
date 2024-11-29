'use client';
import Link from 'next/link';
import Hamburger from '../../public/icons/hamburger';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState, useEffect } from 'react';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger size={50} color="black" className="origin-top-left scale-[.60] lg:scale-100" />
      </SheetTrigger>
      <SheetContent side="left">
        <h1>MENU</h1>
        <Link href="/" className="text-base transition-colors hover:text-gray-600">
          <p className="text-black">Home</p>
        </Link>
        <Link href="/store" className="text-base transition-colors hover:text-gray-600">
          <p className="text-black">Store</p>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
