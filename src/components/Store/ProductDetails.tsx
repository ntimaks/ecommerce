'use client'

import { useState } from 'react'
import { type ProductDB } from 'i/lib/type'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductDetailsProps {
    product: ProductDB | undefined
}

function Button({ children, onClick, className = '', variant = 'default' }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: 'default' | 'outline'
}) {
    const baseStyle = "px-4 py-2 rounded-none focus:outline-none transition-colors duration-200"
    const variantStyle = variant === 'default'
        ? "bg-black text-white hover:bg-neutral-800"
        : "bg-white/80 text-black border border-neutral-200 hover:bg-neutral-100"

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${className}`}
        >
            {children}
        </button>
    )
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!product) {
        return (
            <div className="flex w-full min-h-screen items-center justify-center bg-white">
                <h1 className="text-xl">Item Coming Soon</h1>
            </div>
        )
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 lg:p-8">
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
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center p-0"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span className="sr-only">Previous image</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center p-0"
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
                                    className={`relative aspect-square w-20 flex-shrink-0 border-2 ${index === currentImageIndex ? 'border-black' : 'border-transparent'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
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
                    <p className="text-neutral-600 leading-relaxed">{product.description}</p>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-neutral-600">Size</label>
                            <div className="flex gap-2">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 border border-neutral-200 hover:border-black flex items-center justify-center text-sm"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button className="w-full">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}



// export default function ProductDetails({ product }: ProductDetailsProps) {
//   return (
//     <div className="min-h-screen px-8 pt-44">
//       <div className="grid grid-cols-2 gap-8">
//         <div className="relative aspect-square">
//           <Image src={product.image} alt={product.title} fill className="object-contain" priority />
//         </div>
//         <div className="flex flex-col gap-4">
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
//           <p className="text-muted-foreground">{product.description}</p>
//           <div className="flex items-center gap-2">
//             <span className="text-sm">Rating: {product.rating.rate}/5</span>
//             <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
