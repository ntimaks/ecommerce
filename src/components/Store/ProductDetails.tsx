'use client';

import type { CartItem, ProductDB, Stock } from 'i/lib/type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import { useCart } from '../Cart/providers/CartProvider';
import { toast } from 'sonner';
interface ProductDetailsProps {
  product: ProductDB | undefined;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <h1 className="text-xl">Item Coming Soon</h1>
      </div>
    );
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart } = useCart();

  const sizeOrder = ['S', 'M', 'L', 'XL']; // Define your custom order
  const inventoryKeys = Object.keys(product.inventory).sort((a, b) => {
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
  });

  const [selectedSize, setSelectedSize] = useState<Stock['size']>(inventoryKeys[0] as Stock['size']);

  function handleAddToCart() {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
    };
    addToCart(cartItem);
    toast.success(`${quantity} ${selectedSize} ${product.name} added to cart`);
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 lg:gap-12 lg:p-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[currentImageIndex] ?? ''}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center p-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="outline"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center p-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative size-20 flex-shrink-0 border-2 ${
                    index === currentImageIndex ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-normal">{product.name}</h1>
            <p className="text-xl">${product.price}</p>
          </div>
          <p className="leading-relaxed text-neutral-600">{product.description}</p>
          <div className="space-y-4">
            <div className="space-y-2">
              {inventoryKeys.length > 1 ? (
                <>
                  <label className="text-sm text-neutral-600">Size</label>
                  <div className="flex gap-2">
                    {inventoryKeys.map((size) => (
                      <button
                        key={size}
                        className={`${selectedSize === size ? 'text-black' : 'text-gray-400 hover:text-gray-600'} transition-color flex h-12 w-12 items-center justify-center text-xl font-medium duration-300 ease-in-out`}
                        onClick={() => setSelectedSize(size as Stock['size'])}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}

              <label className="text-sm text-neutral-600">Quantity</label>
              <div className="flex gap-2">
                {Array.from({ length: 10 }, (_, index) => index + 1).map((qty) => (
                  <button
                    key={qty}
                    className={`${quantity === qty ? 'text-black' : 'text-gray-400 hover:text-gray-600'} flex h-12 w-12 items-center justify-center text-xl font-medium transition-colors duration-300 ease-in-out`}
                    onClick={() => setQuantity(qty)}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleAddToCart} className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
