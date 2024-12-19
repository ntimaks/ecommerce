'use client';

import ProductDetails from 'i/components/Store/ProductDetails';
import { type ProductDB, type ProductResponse } from 'i/lib/type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [product, setProduct] = useState<ProductDB[]>([]);

  const params = useParams();
  const productID = params.id as string;

  useEffect(() => {
    async function fetchProduct() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}/api/products?id=${productID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = (await response.json()) as ProductResponse;
      setProduct(data.products);
    }
    fetchProduct().catch(console.error);
  }, [productID]);

  return <ProductDetails product={product[0]} />;
}
