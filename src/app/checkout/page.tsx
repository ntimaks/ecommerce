"use client";

import CheckoutPage from "../../components/CheckoutPage";
import convertToSubcurrency from "i/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from '../../components/Cart/providers/CartProvider';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { calculateTotal } = useCart();
  const amount = calculateTotal()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Checkout</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Complete your purchase
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total</span>
            <span className="text-2xl font-bold">${amount.toFixed(2)}</span>
          </div>


          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#000000',
                  colorText: '#000000',
                },
              },
            }}
          >
            <CheckoutPage amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
}