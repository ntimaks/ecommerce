"use client"
import Image from "next/image";
import { useState } from "react";
import NavBar from "i/components/NavBar";

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState("aorist");

  const images = {
    aorist: "/images/aorist.png",
    image2: "/images/bumba.png",
    image3: "/images/haine.png",
    image4: "/images/plava.png",
    image5: "/images/rainis.png",
    image6: "/images/tepikis.png"
  };

  const buttonLabels = {
    aorist: "Aorist",
    image2: "Bumba",
    image3: "Haine",
    image4: "Plava",
    image5: "Rainis",
    image6: "Tepikis"
  };

  return (
    <main className="flex">
      <div className="w-screen h-screen bg-black relative">
        <Image
          src={images[currentImage as keyof typeof images]}
          alt="Gallery image"
          fill
          className="object-cover"
          priority
        />
        {/* Use NavBar component */}
        <NavBar />

        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          {Object.entries(buttonLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCurrentImage(key)}
              className="text-white text-7xl hover:text-gray-300 text-left"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
