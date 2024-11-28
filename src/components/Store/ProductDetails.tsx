import { type ProductDB } from 'i/lib/type';
import Image from 'next/image';

interface ProductDetailsProps {
  product: ProductDB | undefined;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Item Coming Soon</h1>
      </div>
    );
  return (
    <div className="min-h-screen px-8 pt-44">
      <div className="grid grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image src={product.image ?? ''} alt={product.name} fill className="object-contain" priority />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex items-center gap-2">
            {/* <span className="text-sm">Rating: {product.reviews[0]?.rating ?? 0}/5</span> */}
            {/* <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span> */}
          </div>
        </div>
      </div>
    </div>
  );
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
