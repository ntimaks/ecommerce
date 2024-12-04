import { useCart } from './providers/CartProvider';
import Link from 'next/link';
import { CartItem } from './CartItem';

export default function CartDisplay() {
  const { cart } = useCart();
  return cart.length > 0 ? (
    <div className="flex max-h-[50dvh] flex-col gap-2 overflow-y-auto pt-6">
      {cart.map((item) => (
        <CartItem key={item.product.product_id} item={item} />
      ))}
    </div>
  ) : (
    <div className="flex w-full flex-col items-center justify-center gap-2 pt-8">
      <h1 className="text-lg font-medium">No items in cart!</h1>
      <p className="text-sm text-muted-foreground">
        Check out our products{' '}
        <Link className="underline underline-offset-2" href="/store">
          here
        </Link>
      </p>
      <button onClick={() => console.log(cart)}>test</button>
    </div>
  );
}
