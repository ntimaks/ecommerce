'use client';

import CheckoutPage from './CheckoutPage';
import convertToSubcurrency from 'i/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from './Cart/providers/CartProvider';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { calculateTotal } = useCart();
  const amount = calculateTotal();

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Checkout</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Complete your purchase</p>
      </div>
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Total</span>
          <span className="text-2xl font-bold">${amount.toFixed(2)}</span>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(Number(amount.toFixed(2))),
            currency: 'usd',
            appearance: {
              theme: 'flat',
              variables: {
                colorPrimary: '#000000',
                colorText: '#000000',
              },
            },
          }}
        >
          <CheckoutPage amount={Number(amount.toFixed(2))} />
        </Elements>
      </div>
    </div>
  );
}
