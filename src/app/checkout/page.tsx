import CartOverview from 'i/components/checkout/cart-overview';
import ShippingAddressForm from 'i/components/checkout/shipping-address-form';

export default async function Checkout() {
  return (
    <div className="bg-breathe-move flex min-h-[calc(100dvh-3.5rem)] w-screen items-center justify-center text-smoke">
      <div className="container flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row  gap-4">
          <ShippingAddressForm />
          <CartOverview />
        </div>
      </div>
    </div>
  );
}
