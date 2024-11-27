import Hamburger from '../../public/icons/hamburger';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger size={50} />
      </SheetTrigger>
      <SheetContent side="left">
        <h1>MENU</h1>
      </SheetContent>
    </Sheet>
  );
}
