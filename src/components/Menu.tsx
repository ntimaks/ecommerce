import { Link } from 'lucide-react';
import Hamburger from '../../public/icons/hamburger';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger size={50} color="black" />
      </SheetTrigger>
      <SheetContent side="left">
        <h1>MENU</h1>
        <div className="flex flex-col gap-4 pt-8">
          <Link href="/store" className="text-base hover:text-gray-600 transition-colors">
            Store
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
