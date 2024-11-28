'use client';
import { useState } from 'react';
import imageDetails from './constants/imageDetails.json';
import ImageDisplay from 'i/components/Hero/ImageDisplay';
export default function HomePage() {
  const [currentImage, setCurrentImage] = useState('aorist');

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
          {Object.entries(imageDetails).map(([key, { label }]) => (
            <button
              key={key}
              onMouseEnter={() => setCurrentImage(key)}
              className="font-regular z-[2] text-left text-4xl text-white hover:text-gray-300 md:text-7xl"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
