import { X } from 'lucide-react';
import CheckoutPage from '../CheckoutPage';
import convertToSubcurrency from 'i/lib/convertToSubcurrency';
import { AddressElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutModal({ setIsOpen, amount }: { setIsOpen: (isOpen: boolean) => void; amount: number }) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  function handleAddressChange(e: any) {
    if (e.complete) {
      console.log(e.value.address);
    }
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-center">
        <div className="container relative h-full max-h-[50dvh] w-full rounded-md bg-white p-4">
          <button
            className="absolute right-2 top-2 rounded-full bg-inherit p-1 transition-colors duration-300 hover:bg-gray-400"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
          <h1>Checkout</h1>

          <div className="flex w-full flex-row gap-4">
            <Elements
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: 'flat',
                  variables: {
                    colorPrimary: '#000000',
                    colorText: '#000000',
                  },
                },
              }}
            >

            </Elements>
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'payment',
                amount: convertToSubcurrency(Number(amount.toFixed(2))),
                currency: 'usd',
                appearance: {
                  theme: 'stripe',
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
      </div>
    </div>
  );
}
