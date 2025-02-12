'use client';

import type { CartItem, ProductDB, Stock } from 'i/lib/type';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import { useCart } from '../Cart/providers/CartProvider';
import { toast } from 'sonner';
import ArrrowButton from '../../components/ArrowButton';

interface ProductDetailsProps {
  product: ProductDB | undefined;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return (
      <div className="bg-breathe-move min-h-screen w-screen flex items-center justify-center py-56 px-20">
        <h1 className="text-xl">Item Coming Soon</h1>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(0)


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

  const colors = [
    { name: "Amethyst", class: "bg-purple-600" },
    { name: "Olive", class: "bg-olive-600" },
    { name: "Orange", class: "bg-orange-400" },
    { name: "Black", class: "bg-black" },
  ]

  return (
    <div className="bg-breathe-move min-h-screen w-screen flex flex-col py-56 px-20">



      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 gap-x-20 lg:grid-cols-2 ">
        {/* Left: Image Section */}
        <div className="relative">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto w-full mb-8">
            <nav className="text-[#DEDBD5] space-x-2">
              <a href="/shop" className="hover:text-[#D2F34C]">
                Shop
              </a>
              <span>{">"}</span>
              <a href="/sale" className="hover:text-[#D2F34C]">
                Sale
              </a>
              <span>{">"}</span>
              <span className="text-[#D2F34C]">Product</span>
            </nav>
          </div>



          {/* Main Image */}
          <div className="bg-smoke/50 rounded-3xl p-6 border border-[#DEDBD5] h-full">
            <Image
              src={product.images[currentImageIndex] ?? ""}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain "
              priority
            />
            {/* Thumbnail Navigation */}
            <div className="absolute z-10 flex flex-col gap-2 bg-smoke/50 p-2 rounded-2xl border border-[#DEDBD5]">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-8 h-8 rounded-full overflow-hidden border border-[#DEDBD5] transition-colors bg-smoke/50
                  ${currentImageIndex === index ? "border-[#D2F34C]" : ""}`}
                  style={{ backgroundImage: `url(${product.images[index]})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              <ArrrowButton direction="left" onClick={prevImage} />
              <ArrrowButton direction="right" onClick={nextImage} />
            </div>
          </div>

        </div>

        {/* Right: Product Details */}
        <div className="h-full flex flex-col justify-between h-full gap-y-10">
          <div className="bg-smoke/50 rounded-3xl p-6 border border-[#DEDBD5]">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl text-[#DEDBD5] font-bold nav-text-shadow">{product.name}</h1>
              <div className="text-right">
                {product.price && (
                  <span className="text-[#DEDBD5] line-through opacity-50 mr-2 nav-text-shadow">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-[#DEDBD5] text-2xl font-bold nav-text-shadow">${product.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#DEDBD5] font-light nav-text-shadow">{product.description}</p>
              <button className="px-4 py-2 rounded-full bg-smoke/50 border border-[#DEDBD5] font-bold text-[#DEDBD5] hover:bg-smoke/70 nav-text-shadow">
                Read More
              </button>
            </div>
          </div>

          <div className="bg-smoke/50 rounded-3xl p-6 border border-[#DEDBD5]">
            <div className="space-y-6">
              <div className="w-full bg-[#DEDBD5] h-0.5 nav-text-shadow"></div>
              <div>
                <div className="flex justify-between mb-4 nav-text-shadow">
                  <span className="text-[#DEDBD5] font-bold">Find your size</span>
                  <div className="flex flex-col text-right">
                    <span className="text-[#DEDBD5] font-bold">Out of stock?</span>
                    <span className="text-[#DEDBD5] font-light underline">Find out when it's back</span>
                  </div>

                </div>
                <div className="flex flex-wrap gap-2">
                  {inventoryKeys.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as Stock["size"])}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-[#DEDBD5] border transition-colors
                        ${selectedSize === size
                          ? "bg-[#D2F34C] border-[#D2F34C] text-black"
                          : "bg-smoke/50 border-[#DEDBD5] hover:bg-smoke/70"
                        }`}
                    >
                      {size}
                    </button>
                  ))}

                </div>
              </div>
              <div className="w-full bg-[#DEDBD5] h-0.5 nav-text-shadow"></div>

              <div>
                <span className="text-[#DEDBD5] block mb-4">Color</span>

                <div className="flex flex-row items-center gap-4">
                  <div className="flex gap-3 bg-smoke/50 nav-text-shadow rounded-full p-2 px-3 border border-[#DEDBD5]">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-6 h-6 rounded-full nav-text-shadow ring-1 ring-[#DEDBD5] ${color.class} ${selectedColor === index ? "scale-110" : ""}`}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                  <p className="text-[#DEDBD5] font-light nav-text-shadow">{colors[selectedColor]?.name}</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-lime rounded-full text-black font-medium transition-colors">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
