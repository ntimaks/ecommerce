import { ProductDB, type Product } from 'i/lib/type';
import ProductDetails from 'i/components/Store/ProductDetails';
import Image from 'next/image';
import { Suspense } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string): Promise<ProductDB[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/products?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = (await response.json()) as ProductDB[];

  return data;
}
// async function getProduct(id: string): Promise<Product> {
//   const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch product');
//   }
//   return response.json() as Promise<Product>;
// }

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProduct(id);

  return <ProductDetails product={product[0]} />;
}
