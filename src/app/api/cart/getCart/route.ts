import { NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cart_id = url.searchParams.get('cart_id');

    const supabase = await createClient();
    const { data, error } = await supabase.from('Carts').select('*').eq('cart_id', cart_id);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch cart data' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
  }
}
