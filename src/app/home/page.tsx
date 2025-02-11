"use client"
import Contact from "../../../public/icons/contact"
import Image from "next/image";
import image1 from "../../../public/images/image1.png"
import image3 from "../../../public/images/image3.png"
import ArrowButton from "src/components/ArrowButton";
import HomeImage from "src/components/home/HomeImage";

const thumbnails = [
  { src: image1, alt: "Nature thumbnail 1" },
  { src: image3, alt: "Nature thumbnail 3" },
]

const colors = [
  { name: "Purple", class: "bg-purple-400" },
  { name: "Olive", class: "bg-green-600" },
  { name: "Orange", class: "bg-orange-400" },
  { name: "Black", class: "bg-black" },
]

export default function Page() {

  return (
    <div className="bg-breathe-move h-screen w-screen flex flex-col py-56 px-8">

      <div className="flex flex-col md:flex-row justify-between gap-20 items-start mb-8 ">
        {/* Left Column */}
        <div className="md:w-1/2">
          <button className="bg-smoke/50 relative flex w-auto flex-row items-center rounded-full border border-[#DEDBD5] text-[#DEDBD5] font-bold px-4 py-1 mb-4">
            <p className="nav-text-shadow">Contact Us</p>
            <Contact size={20} color="#DEDBD5" />
          </button>
          <HomeImage />

        </div>

        {/* Right Column */}
        <div className=" h-full flex flex-col justify-between">

          <div className="text-right">
            <h1 className="text-2xl font-light text-[#DEDBD5]">LOREM IPSUM DOLOR SIT AMET,</h1>
            <p className="text-[#7D7C73]">CONSECTETUR ADIPISCING.</p>
            <div className="flex items-center justify-end gap-2 mt-4">
              {thumbnails.map((thumb, i) => (
                <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-[#DEDBD5] border">
                  <Image
                    src={thumb.src || "/placeholder.svg"}
                    alt={thumb.alt}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              <ArrowButton />
            </div>
          </div>



          <div className="space-y-4 text-right">
            <h2 className="text-4xl font-bold leading-tight text-[#DEDBD5]">Lorem ipsum dolor sit amet,</h2>
            <div className="flex items-center justify-between">
              <p className="text-4xl text-zinc-400 font-light">consectetur adipiscing.</p>
              <ArrowButton />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
