'use client';
import { useEffect, useState } from 'react';
import { type Product } from 'i/lib/type';
import Image from 'next/image';

export default function ProductDetails({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen pt-44 px-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-2xl font-semibold">${product.price}</p>
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Rating: {product.rating.rate}/5</span>
                        <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Category: {product.category}</p>
                </div>
            </div>
        </div>
    );
}
