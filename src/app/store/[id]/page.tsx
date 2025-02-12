import ProductDetails from 'i/components/Store/ProductDetails';
import { type ProductResponse } from 'i/lib/type';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const productID = id as string;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}/api/products?id=${productID}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = (await response.json()) as ProductResponse;

  return <ProductDetails product={data.products[0]} />;
}
