'use client';

import type { CartItem, ProductDB, Stock } from 'i/lib/type';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import ArrrowButton from '../../components/ArrowButton';
import { useCart } from '../Cart/providers/CartProvider';

interface ProductDetailsProps {
  product: ProductDB | undefined;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return (
      <div className="bg-breathe-move flex min-h-screen w-screen items-center justify-center px-20 py-56">
        <h1 className="text-xl">Item Coming Soon</h1>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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

  const colors = [
    { name: 'Amethyst', class: 'bg-purple-600' },
    { name: 'Olive', class: 'bg-olive-600' },
    { name: 'Orange', class: 'bg-orange-400' },
    { name: 'Black', class: 'bg-black' },
  ];

  return (
    <div className="bg-breathe-move flex min-h-screen w-screen flex-col px-20 py-56">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-20 lg:grid-cols-2">
        {/* Left: Image Section */}
        <div className="relative flex h-full w-full flex-col">
          {/* Breadcrumb */}
          <div className="mx-auto mb-8 w-full max-w-7xl ">
            <nav className="space-x-2 text-[#DEDBD5]">
              <a href="/shop" className="hover:text-[#D2F34C]">
                Shop
              </a>
              <span>{'>'}</span>
              <a href="/sale" className="hover:text-[#D2F34C]">
                Sale
              </a>
              <span>{'>'}</span>
              <span className="text-[#D2F34C]">Product</span>
            </nav>
          </div>

          {/* Main Image */}
          <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-[#DEDBD5] bg-smoke/50 p-6">
            <Image
              src={product.images[currentImageIndex] ?? ''}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain "
              priority
            />
            {/* Thumbnail Navigation */}
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-2xl border border-[#DEDBD5] bg-smoke/50 p-2 nav-text-shadow">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`size-10 overflow-hidden rounded-full border bg-smoke/50 shadow-md transition-colors ${currentImageIndex === index ? 'border-lime bg-lime/30 size-10 ' : 'border-[#DEDBD5]'}`}
                  style={{ backgroundImage: `url(${product.images[index]})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between ">
              <ArrrowButton direction="left" onClick={prevImage} />
              <ArrrowButton direction="right" onClick={nextImage} />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex h-full flex-col justify-between gap-y-10">
          <div className="rounded-3xl border border-[#DEDBD5] bg-smoke/50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h1 className="nav-text-shadow text-2xl font-bold text-[#DEDBD5]">{product.name}</h1>
              <div className="text-right">
                {product.price && (
                  <span className="nav-text-shadow mr-2 text-[#DEDBD5] line-through opacity-50">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="nav-text-shadow text-2xl font-bold text-[#DEDBD5]">${product.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="nav-text-shadow font-light text-[#DEDBD5]">{product.description}</p>
              <button className="nav-text-shadow rounded-full border border-[#DEDBD5] bg-smoke/50 px-4 py-2 font-bold text-[#DEDBD5] hover:bg-smoke/70">
                Read More
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-[#DEDBD5] bg-smoke/50 p-6">
            <div className="space-y-6">
              <div className=" h-0.5 w-full bg-[#DEDBD5]"></div>
              <div>
                <div className=" mb-4 flex justify-between">
                  <span className="font-bold text-[#DEDBD5]">Find your size</span>
                  <div className="flex flex-col text-right">
                    <span className="font-bold text-[#DEDBD5]">Out of stock?</span>
                    <span className="font-light text-[#DEDBD5] underline">Find out when it's back</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inventoryKeys.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as Stock['size'])}
                      className={`flex shadow-md h-12 w-12 items-center text-xl justify-center rounded-full border text-[#DEDBD5] transition-colors ${selectedSize === size
                        ? 'border-lime bg-lime font-bold text-black'
                        : 'border-[#DEDBD5] bg-smoke/50 hover:bg-lime/30 hover:text-lime hover:border-lime'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="nav-text-shadow h-0.5 w-full bg-[#DEDBD5]"></div>

              <div>
                <span className="mb-4 block text-[#DEDBD5]">Color</span>

                <div className="flex flex-row items-center gap-4">
                  <div className="nav-text-shadow flex gap-3 rounded-full border border-[#DEDBD5] bg-smoke/50 p-2 px-3">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`nav-text-shadow h-6 w-6 rounded-full ring-1 ring-[#DEDBD5] ${color.class} ${selectedColor === index ? 'scale-110' : ''}`}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                  <p className="nav-text-shadow font-light text-[#DEDBD5]">{colors[selectedColor]?.name}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full rounded-full bg-lime py-4 font-medium text-black transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
