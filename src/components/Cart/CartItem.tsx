import type { CartItem } from 'i/lib/type';
import Image from 'next/image';
import { useCart } from './providers/CartProvider';
import Link from 'next/link';
import Checkout from '../Checkout';

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
export function CartItem({ item }: { item: CartItem }) {
  const total = item.product.price * item.quantity;
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-2 border-b border-muted-foreground py-4">
      <div className="col-span-1">
        <Image
          src={item.image ?? ''}
          alt={item.product.name}
          width={100}
          height={100}
          className="w-full object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 p-2">
        <h1 className="text-lg font-bold">{item.product.name}</h1>
        <div className="grid grid-cols-2 gap-2">
          {/* Left Side: Description, Stock,  */}
          <div className="flex w-full flex-col gap-2">
            <p className="">{item.product.description}</p>
            <p className="font-semibold">In Stock</p>
          </div>
          {/* Right Side: Price, Size, Quanity, Total  */}
          <div className="flex w-full flex-col gap-2">
            <p>
              <strong>Item Price:</strong> ${item.product.price}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </div>
        </div>
        <button className="flex w-full items-center justify-center rounded-md border border-black">Remove</button>
      </div>

    </div>
  );
}
