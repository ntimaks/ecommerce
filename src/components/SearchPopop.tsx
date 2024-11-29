'use client';
import Search from '../../public/icons/search';
import SearchBar from './SearchInput';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState, useEffect } from 'react';

export default function SearchPopup() {
  return (
    <Sheet>
      <SheetTrigger>
        <Search size={50} color="black" className="origin-top-right scale-[.60] lg:scale-100" />
      </SheetTrigger>
      <SheetContent side="top">
        <SearchBar />
      </SheetContent>
    </Sheet>
  );
}
