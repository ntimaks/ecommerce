'use client';
import Link from 'next/link';
import Hamburger from '../../public/icons/hamburger';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState, useEffect } from 'react';

export default function Menu() {
  const [iconSize, setIconSize] = useState(50);

  useEffect(() => {
    const updateSize = () => {
      setIconSize(window.innerWidth <= 768 ? 30 : 50);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger size={iconSize} color="black" />
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
