import Image from 'next/image';
import type { CartItem } from 'i/lib/type';
import { useCart } from 'i/components/Cart/providers/CartProvider';
import { Minus, Plus } from 'lucide-react';

export function CartDropdownItem({ item }: { item: CartItem }) {
  const { removeFromCart, updateCart, calculateTotal } = useCart();

  const total = item.product.price * item.quantity;

  const handleRemove = () => {
    removeFromCart(item);
  };

  return (
    <div
      key={item.product.product_id}
      className="flex w-full min-w-fit flex-shrink-0 flex-row items-center justify-around rounded-[16px] border border-smoke bg-smoke/50 px-2 shadow-lg"
    >
      <Image src={item.image ?? ''} alt={item.product.name} width={200} height={200} className="max-w-[100px]" />

      <div className="flex flex-col gap-2 p-2">
        <h1 className="whitespace-nowrap text-lg font-bold">{item.product.name}</h1>
        <article className="flex flex-col gap-2">
          {/* Right Side: Price, Size, Quanity, Total  */}
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm">****{item.product.product_id.slice(-4)}</p>
            {/* Price and Quantity */}
            <p>
              <strong>${total.toFixed(2)}</strong>{' '}
              {item.quantity > 1 && (
                <span className="whitespace-nowrap text-sm">
                  (${item.product.price} x {item.quantity})
                </span>
              )}
            </p>
          </div>
        </article>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-lime p-2 font-bold shadow-md">
        <button onClick={() => updateCart(item, 'decrement')}>
          <Minus />
        </button>
        {item.quantity}
        <button onClick={() => updateCart(item, 'increment')}>
          <Plus />
        </button>
      </div>
    </div>
  );
}
