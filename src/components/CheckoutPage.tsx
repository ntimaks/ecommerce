'use client';

import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import convertToSubcurrency from 'i/lib/convertToSubcurrency';

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = (await response.json()) as { clientSecret: string };
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
        setErrorMessage('Failed to initiate payment. Please try again later.');
      }
    };

    void fetchPaymentIntent();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded properly.');
      setLoading(false);
      return;
    }

    const submitResult = await elements.submit();

    if (submitResult.error) {
      setErrorMessage(submitResult.error.message);
      setLoading(false);
      return;
    }

    const paymentResult = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_API_URL}/payment-success?amount=${amount}`,
      },
    });

    if (paymentResult.error) {
      setErrorMessage(paymentResult.error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-2">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="w-full rounded-md bg-black p-2 font-bold text-white disabled:animate-pulse disabled:opacity-50"
      >
        {!loading ? `Pay $${amount}` : 'Processing...'}
      </button>
    </form>
  );
};

export default CheckoutPage;
