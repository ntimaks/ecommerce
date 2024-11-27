import { NextResponse } from 'next/server';
import { type Product } from 'i/lib/type';

export async function GET() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data: Product[] = (await response.json()) as Product[];
  return NextResponse.json({ data });
}
