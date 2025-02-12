'use client';
import Contact from '../../../public/icons/contact';
import Image from 'next/image';
import image1 from '../../../public/images/image1.png';
import image3 from '../../../public/images/image3.png';
import ArrowButton from 'src/components/ArrowButton';
import HomeImage from 'src/components/home/HomeImage';

const thumbnails = [
  { src: image1, alt: 'Nature thumbnail 1' },
  { src: image3, alt: 'Nature thumbnail 3' },
];

export default function Page() {
  return (
    <div className="bg-breathe-move flex h-screen w-screen flex-col items-center justify-center px-8 py-56">
      <div className="mb-8 flex min-w-[75dvw] flex-col items-start justify-between gap-20 rounded-lg p-8 md:flex-row">
        {/* Left Column */}
        <div className="md:w-1/2">
          <button className="relative mb-4 flex w-auto flex-row items-center rounded-full border border-[#DEDBD5] bg-smoke/50 px-4 py-1 font-bold text-[#DEDBD5]">
            <p className="nav-text-shadow">Contact Us</p>
            <Contact size={20} color="#DEDBD5" />
          </button>
          <HomeImage />
        </div>

        {/* Right Column */}
        <div className="flex h-full flex-col justify-between">
          <div className="text-right">
            <h1 className="text-2xl font-light text-[#DEDBD5]">LOREM IPSUM DOLOR SIT AMET,</h1>
            <p className="text-[#7D7C73]">CONSECTETUR ADIPISCING.</p>
            <div className="mt-4 flex items-center justify-end gap-2">
              {thumbnails.map((thumb, i) => (
                <div key={i} className="h-10 w-10 overflow-hidden rounded-full border border-[#DEDBD5]">
                  <Image
                    src={thumb.src || '/placeholder.svg'}
                    alt={thumb.alt}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <ArrowButton />
            </div>
          </div>

          <div className="space-y-4 text-right">
            <h2 className="text-4xl font-bold leading-tight text-[#DEDBD5]">Lorem ipsum dolor sit amet,</h2>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-light text-zinc-400">consectetur adipiscing.</p>
              <ArrowButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
