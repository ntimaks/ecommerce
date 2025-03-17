import { type ProductDB } from 'i/lib/type';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function ProductListing({ product }: { product: ProductDB }) {
  const url = usePathname();
  const sizes = ["S", "M", "L", "XL"]

  return (
    <div className="group relative" key={product.product_id}>
      {/* Product Card */}
      <div className="bg-smoke/50 rounded-3xl p-2 border border-[#DEDBD5]">
        <div className="relative aspect-square">
          <a href={`${url}/${product.product_id}`}>
            <Image
              src={product.images[0] ?? ""}
              alt={product.name}
              fill
              className="object-contain transition-all duration-200 group-hover:opacity-80"
            />
          </a>

          {/* Size Options - Show on hover */}
          <div className="absolute left-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {sizes.map((size) => (
              <button
                key={size}
                className="w-8 h-8 rounded-full bg-smoke/50 border border-[#DEDBD5] text-[#DEDBD5] text-sm flex items-center justify-center hover:bg-smoke/70 transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-[#DEDBD5]">
        <div className="flex flex-col justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm opacity-80">Black</p>
          </div>
          <div className="flex flex-row w-full">

            <div className="flex items-center gap-2">
              {product.price && (
                <span className="text-sm line-through opacity-50">${product.price.toFixed(2)}</span>
              )}
              <span className="text-lg">${product.price.toFixed(2)}</span>
            </div>
            <span className="text-[#D2F34C] text-sm w-full items-center justify-center text-right">20% OFF</span>
          </div>
        </div>
      </div>
    </div>
  )
}
// export default function ProductListing({ product }: { product: Product }) {
//   const url = usePathname();

//   return (
//     <div className="group w-full overflow-hidden rounded-md" key={product.id}>
//       {/* Image and Size Display */}
//       <div className="relative aspect-square w-full overflow-hidden rounded-md">
//         <a href={`${url}/${product.id}`} target="_blank" rel="noopener noreferrer">
//           <Image
//             src={product.image}
//             alt={product.title}
//             width={100}
//             height={100}
//             className="aspect-square w-full object-cover transition-all duration-200 group-hover:blur-sm"
//           />
//         </a>
//         <div className="group-hover:delay-400 absolute left-0 right-0 top-1/2 flex w-full justify-evenly bg-transparent p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100">
//           <p className="text-base font-semibold text-black">S</p>
//           <p className="text-base font-semibold text-muted-foreground hover:cursor-not-allowed">M</p>
//           <p className="text-base font-semibold text-black">L</p>
//         </div>
//       </div>
//       <div className="flex w-full flex-col p-2">
//         <h1 className="line-clamp-1 text-lg font-bold">{product.title}</h1>
//         <p className="text-sm text-muted-foreground">${product.price}</p>
//       </div>
//     </div>
//   );
// }
