"use client"
import Image from "next/image";
import { useState } from "react";
import NavBar from "i/components/NavBar";
import imageDetails from "./constants/imageDetails.json";

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState("aorist");
  return (
    <main>
      <div className="w-screen h-screen bg-black relative">

        <Image
          src={imageDetails[currentImage as keyof typeof imageDetails].src}
          alt="Gallery image"
          fill
          className="object-cover"
          priority
        />
        <div id="interlaced"></div>
        <div id="glare"></div>

        <NavBar />

        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          {Object.entries(imageDetails).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setCurrentImage(key)}
              className="font-regular text-white text-4xl md:text-7xl hover:text-gray-300 text-left"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
