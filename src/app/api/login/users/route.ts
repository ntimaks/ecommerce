import { NextResponse } from 'next/server';
import clientPromise from 'i/lib/mongodb';
export async function POST(req: Request) {
  const { email } = await req.json();
  const client = await clientPromise;
  const db = client.db('ECommerce');
  const user = await db.collection('Users').findOne({ email: email });
  if (!user) {
    return NextResponse.json({ error: 'User not found', status: 404 });
  }
  return NextResponse.json({ data: user, status: 200 });
}
