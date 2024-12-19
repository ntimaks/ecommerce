'use client';
import { useEffect, useState } from 'react';
import type { ProductDB, Product, ProductResponse } from 'i/lib/type';
import ProductListing from 'i/components/Store/ProductListing';
import { createClient } from '../../../utils/supabase/server';

export default function Store() {
  const [products, setProducts] = useState<ProductDB[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data: ProductResponse = (await response.json()) as ProductResponse;
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products');
      }
    }
    fetchProducts().catch(console.error);
  }, []);

  return (
    <div className="min-w-screen max grid min-h-screen grid-cols-2 gap-4 bg-white px-8 pt-44 md:grid-cols-5">
      {products.map((product) => (
        <ProductListing key={product._id} product={product} />
      ))}
    </div>
  );
}
