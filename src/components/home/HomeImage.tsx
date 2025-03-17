import { useState } from "react"
import image1 from "../../../public/images/image1.png"
import image3 from "../../../public/images/image3.png"
import Image from "next/image"

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

export default function HomeImage() {
    const [selectedColor, setSelectedColor] = useState(0)

    return (
        <div className="relative rounded-3xl overflow-hidden">
            <div className="w-full h-full aspect-square">
                <Image
                    src={image3}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full h-full object-cover border border-[#DEDBD5] rounded-3xl"
                />
            </div>

            {/* Color Selection */}
            <div className="absolute top-6 right-6 flex gap-3 bg-smoke/50 nav-text-shadow rounded-full p-2 px-3 border border-[#DEDBD5]">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        className={`w-6 h-6 rounded-full nav-text-shadow ring-1 ring-[#DEDBD5] ${color.class} ${selectedColor === index ? "scale-110" : ""}`}
                        onClick={() => setSelectedColor(index)}
                        aria-label={`Select ${color.name} color`}
                    />
                ))}
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-full bg-smoke/50 nav-text-shadow text-[#DEDBD5] rounded-full font-bold p-2 px-3 border border-[#DEDBD5]">SS25</button>
                    <button className="px-4 py-2 rounded-full bg-smoke/50 nav-text-shadow text-[#DEDBD5] rounded-full font-bold p-2 px-3 border border-[#DEDBD5]">New Jackets</button>
                </div>
                <button className="px-4 py-2 rounded-full bg-lime/70 text-black font-medium hover:bg-[#c7e745] transition-colors">
                    Shop
                </button>
            </div>
        </div>
    )
}