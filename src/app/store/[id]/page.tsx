import { type Product } from 'i/lib/type';
import ProductDetails from 'i/components/Store/ProductDetails';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    return <ProductDetails product={product} />;
}
