'use client';
import { useEffect, useState } from 'react';
import type { ProductDB, Product } from 'i/lib/type';
import ProductListing from 'i/components/Store/ProductListing';

export default function Store() {
  const [products, setProducts] = useState<ProductDB[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data: ProductDB[] = (await response.json()) as ProductDB[];
      setProducts(data);
    }

    try {
      fetchProducts().catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }, []);
  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetch('/api/product');
  //     const data: { data: Product[] } = (await response.json()) as { data: Product[] };
  //     setProducts(data.data);
  //   }

  //   try {
  //     fetchProducts().catch(console.error);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <div className="min-w-screen max grid min-h-screen grid-cols-2 md:grid-cols-5 gap-4 bg-white px-8 pt-44">
      {products.map((product) => (
        <ProductListing key={product._id} product={product} />
      ))}
    </div>
  );
}
