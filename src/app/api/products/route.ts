import { createClient } from 'utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      const { data: products } = await supabase.from('Products').select();
      return NextResponse.json({ products, status: 200 });
    } else {
      const { data: products } = await supabase.from('Products').select().eq('_id', id);
      return NextResponse.json({ products, status: 200 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
