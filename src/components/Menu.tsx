import Hamburger from "./hamburger";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";


export default function Menu() {
    return (
        <Sheet>
            <SheetTrigger><Hamburger size={50} /></SheetTrigger>
            <SheetContent side="left" >
                <SheetHeader>
                    <SheetTitle>MENU</SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
