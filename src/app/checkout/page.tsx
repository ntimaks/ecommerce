'use client';

import CartOverview from 'i/components/checkout/cart-overview';
import ShippingAddressForm from 'i/components/checkout/shipping-address-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from 'i/components/Cart/providers/CartProvider';


if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { cart, calculateTotal } = useCart();
  const shipping = 0;
  const tax = 0;
  const total = calculateTotal() + shipping + tax;

  return (
    <div className="bg-breathe-move flex min-h-[calc(100dvh-3.5rem)] w-screen items-center justify-center text-smoke">
      <div className="container flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row gap-4 ">
          <Elements stripe={stripePromise} options={{
            mode: 'payment',
            amount: total * 100,
            currency: 'usd',
            appearance: {
              theme: 'flat',
              variables: {
                colorPrimary: '#C2F733', //lime color accent for buttons
                colorText: '#111111',//white color for text
                colorBackground: '#B2AFAB',//light gray color for background
                colorDanger: '#8B0000',//red color for errors
                borderRadius: '20px',
                spacingUnit: '3px',
                logoColor: "dark",
                colorSuccess: "C2F733",//lime color for success
                colorTextSecondary: "111111",//dark color for secondary text
                iconColor: "C2F733",//lime color for icons
                iconHoverColor: "C2F733",//lime color for icons on hover
                fontFamily: "CabinetGrotesk-Variable,../../public/fonts/CabinetGrotesk-Variable.woff2",
                fontWeightNormal: "200",
              },
            },
          }}>
            <ShippingAddressForm />
          </Elements>
          <CartOverview />
        </div>
      </div>
    </div>
  );
}