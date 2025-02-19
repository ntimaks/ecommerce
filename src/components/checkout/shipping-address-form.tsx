'use client';

import { AddressElement, Elements } from '@stripe/react-stripe-js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export default function ShippingAddressForm() {
  function handleAddressChange(e: any) {
    if (e.complete) {
      const address = e.value.address;
      console.log(address);
    }
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-2xl font-bold">Shipping Address</h1>
      <div className="flex flex-col justify-between gap-4 rounded-[20px] border border-smoke bg-smoke/50 p-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <AddressElement
            onChange={handleAddressChange}
            options={{
              mode: 'shipping',
              blockPoBox: true,
              contacts: [
                {
                  name: 'Jane Doe',
                  address: {
                    line1: '354 Oyster Point Blvd',
                    line2: '',
                    city: 'South San Francisco',
                    state: 'CA',
                    postal_code: '94080',
                    country: 'US',
                  },
                },
              ],
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
              defaultValues: {
                name: 'Jane Doe',
                address: {
                  line1: '354 Oyster Point Blvd',
                  line2: '',
                  city: 'South San Francisco',
                  state: 'CA',
                  postal_code: '94080',
                  country: 'US',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
