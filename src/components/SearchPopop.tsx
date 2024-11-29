'use client';
import Search from '../../public/icons/search';
import SearchBar from './SearchInput';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState, useEffect } from 'react';

export default function SearchPopup() {
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
        <Search size={iconSize} color="black" />
      </SheetTrigger>
      <SheetContent side="top">
        <SearchBar />
      </SheetContent>
    </Sheet>
  );
}
