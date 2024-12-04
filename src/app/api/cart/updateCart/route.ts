import clientPromise from 'i/lib/mongodb';
import { CartItem } from 'i/lib/type';

export async function PUT(req: Request) {
  const { cart_id, products, user_id } = (await req.json()) as {
    cart_id: string;
    products: CartItem[];
    user_id: string;
  };
  console.log('CART ID', cart_id);
  console.log('PRODUCTS', products);
  console.log('USER ID', user_id);
  if (!cart_id || !products || !user_id) {
    return new Response('Missing cart_id, products, or user_id', { status: 400 });
  } else {
    try {
      const client = clientPromise;
      const db = client.db('ECommerce');
      const cart = await db.collection('Carts').updateOne({ cart_id: cart_id }, { $set: { products: products } });
      console.log('CART', cart);
      return new Response('Cart updated', { status: 200 });
    } catch (e) {
      console.error(e);
      return new Response('Error updating cart', { status: 500 });
    }
  }
}
