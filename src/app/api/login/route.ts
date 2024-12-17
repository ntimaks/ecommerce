import { NextResponse } from 'next/server';
import { signIn } from 'i/server/auth';
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const result = await signIn('credentials', { email, password });
  console.log('WTFFF', result);
  return NextResponse.json({ data: result });
}
