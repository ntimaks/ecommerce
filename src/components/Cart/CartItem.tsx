import Image from 'next/image';
import type { CartItem } from 'i/lib/type';
import { useCart } from './providers/CartProvider';
import { Minus, Plus } from 'lucide-react';

export function CartItem({ item, variant = 'sidebar' }: { item: CartItem; variant?: 'sidebar' | 'cart' }) {
  const { removeFromCart, updateCart, calculateTotal } = useCart();

  const total = item.product.price * item.quantity;

  const handleRemove = () => {
    removeFromCart(item);
  };

  if (variant === 'sidebar') {
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
              <div className="flex items-center gap-2">
                <strong>Quantity:</strong>
                <button onClick={() => updateCart(item, 'decrement')}>
                  <Minus />
                </button>
                {item.quantity}
                <button onClick={() => updateCart(item, 'increment')}>
                  <Plus />
                </button>
              </div>
              <p>
                <strong>Total:</strong> ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <button className="flex w-full items-center justify-center border border-black" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div key={item.product.product_id} className="flex w-[calc(50%-.75rem)] flex-shrink-0 rounded-sm shadow-lg">
        <Image src={item.image ?? ''} alt={item.product.name} width={200} height={200} className="w-1/2" />

        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-lg font-bold">{item.product.name}</h1>
          <div className="flex flex-col gap-2">
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
              <div className="flex items-center gap-2">
                <strong>Quantity:</strong>
                <button onClick={() => updateCart(item, 'decrement')}>
                  <Minus />
                </button>
                {item.quantity}
                <button onClick={() => updateCart(item, 'increment')}>
                  <Plus />
                </button>
              </div>
              <p>
                <strong>Total:</strong> ${calculateTotal(item).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="flex w-full items-center justify-center border border-black"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
