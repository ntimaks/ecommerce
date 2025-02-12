import { CartDropdownItem } from 'i/components/layout/navbar/cart-dropdown-item';
import { useCart } from 'i/components/Cart/providers/CartProvider';
import { Button } from 'i/components/ui/button';
import { Input } from 'i/components/ui/input';
import { Label } from 'i/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from 'i/components/ui/popover';
import { ShoppingBag } from 'lucide-react';

export function CartDropdown() {
  const { cart, updateCart, removeFromCart, calculateTotal } = useCart();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer rounded-r-full bg-transparent px-2 py-2 pr-4 transition-colors duration-300 ease-in-out hover:bg-white/50">
          <ShoppingBag />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="absolute -right-3 mt-2 min-w-fit rounded-[20px] border-smoke bg-smoke/50 backdrop-blur-sm"
        side="bottom"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-lime">Cart</h4>
            <p className="text-sm text-muted">Review your cart before checking out.</p>
          </div>
          {cart.map((item) => (
            <CartDropdownItem item={item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
