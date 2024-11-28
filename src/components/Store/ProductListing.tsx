import { type ProductDB } from 'i/lib/type';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function ProductListing({ product }: { product: ProductDB }) {
  const url = usePathname();

  return (
    <div className="group w-full overflow-hidden rounded-md" key={product.product_id}>
      {/* Image and Size Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <a href={`${url}/${product.product_id}`} target="_blank" rel="noopener noreferrer">
          <Image
            src={product.image ?? ''}
            alt={product.name}
            width={100}
            height={100}
            className="aspect-square w-full object-cover transition-all duration-200 group-hover:blur-sm"
          />
        </a>
        <div className="group-hover:delay-400 absolute left-0 right-0 top-1/2 flex w-full justify-evenly bg-transparent p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100">
          <p className="text-base font-semibold text-black">S</p>
          <p className="text-base font-semibold text-muted-foreground hover:cursor-not-allowed">M</p>
          <p className="text-base font-semibold text-black">L</p>
        </div>
      </div>
      <div className="flex w-full flex-col p-2">
        <h1 className="line-clamp-1 text-lg font-bold">{product.name}</h1>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
    </div>
  );
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
