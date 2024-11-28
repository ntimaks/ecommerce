import clientPromise from 'i/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const id = url.searchParams.get('id');
    const client = clientPromise;
    const db = client.db('ECommerce');

    let query = {};
    if (id) {
      query = { product_id: id };
    }

    const sample = await db.collection('Products').find(query).sort({ metacritic: -1 }).limit(10).toArray();
    return NextResponse.json(sample);
  } catch (e) {
    console.error(e);
  }
}
