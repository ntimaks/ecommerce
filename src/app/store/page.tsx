'use client';
import { useEffect, useState } from 'react';
import { type Product } from 'i/lib/type';
import ProductListing from 'i/components/Store/ProductListing';


export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/product');
      const data: { data: Product[] } = (await response.json()) as { data: Product[] };
      setProducts(data.data);
    }

    try {
      fetchProducts().catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="bg-muted min-w-screen max grid min-h-screen grid-cols-5 gap-4 px-8 pt-44">
      {products.map((product) => (
        <ProductListing key={product.id} product={product} />
      ))}
    </div>
  );
}
