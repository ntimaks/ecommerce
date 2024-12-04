import clientPromise from 'i/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const cart_id = url.searchParams.get('cart_id');
    const client = clientPromise;
    const db = client.db('ECommerce');

    let query = {};
    if (cart_id) {
      query = { cart_id: cart_id };
    }

    const sample = await db.collection('Carts').find(query).toArray();
    return NextResponse.json(sample);
  } catch (e) {
    console.error(e);
  }
}
