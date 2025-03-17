'use client';

import { useEffect, useState } from 'react';
import imageDetails from './constants/imageDetails.json';
import ImageDisplay from 'i/components/Hero/ImageDisplay';
import { type ProductDB, type ProductResponse } from 'i/lib/type';
import ProductDetails from 'i/components/Store/ProductDetails';
export default function HomePage() {
  const [currentImage, setCurrentImage] = useState('aorist');
  const [products, setProducts] = useState<ProductDB[]>([]);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data: ProductResponse = (await response.json()) as ProductResponse;
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products');
      }
    }
    fetchProducts().catch(console.error);
  }, []);
  return (
    <main>
      <div className="relative h-screen w-screen bg-black">
        <ImageDisplay
          src={imageDetails[currentImage as keyof typeof imageDetails].src}
          alt="Gallery image"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          {Object.entries(imageDetails).map(([key, { label }], i) => (
            <button
              key={key}
              onMouseEnter={() => {
                setCurrentImage(key);
                setProductIndex(i);
              }}
              className="font-regular z-[2] text-left text-4xl text-white hover:text-gray-300 md:text-7xl"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {products.length > 0 ? <ProductDetails product={products[productIndex]} /> : <div>loading</div>}
    </main>
  );
}
