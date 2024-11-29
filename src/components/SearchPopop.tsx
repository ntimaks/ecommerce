'use client';
import Search from '../../public/icons/search';
import SearchBar from './SearchInput';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Search size={window.innerWidth <= 768 ? 30 : 50} color="black" />
      </SheetTrigger>
      <SheetContent side="top">
        <SearchBar />
      </SheetContent>
    </Sheet>
  );
}
