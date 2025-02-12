'use client';
import { useEffect, useState } from 'react';
import type { ProductDB, Product, ProductResponse } from 'i/lib/type';
import ProductListing from 'i/components/Store/ProductListing';
import { ChevronDown } from 'lucide-react';
import { FilterButton } from 'i/components/Store/FilterButton';

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
    <div className="bg-breathe-move min-h-screen w-screen flex flex-col py-56 px-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#DEDBD5] text-2xl">All Products ({products.length})</h1>
          <FilterButton text="Featured" />
        </div>

        {/* Filters and Products Grid */}
        <div className="flex gap-8">
          {/* Filters */}
          <div className="space-y-4 w-40">
            <FilterButton text="Department" />
            <FilterButton text="Colour" />
            <FilterButton text="Size" />
            <FilterButton text="Price" />
          </div>

          {/* Products Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductListing key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
