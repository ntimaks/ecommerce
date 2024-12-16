'use client';

import { CartItem } from 'i/components/Cart/CartItem';
import { useCart } from 'i/components/Cart/providers/CartProvider';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CheckoutModal from 'i/components/Cart/CheckoutModal';

export default function Page() {
  const { cart, updateCart, removeFromCart, calculateTotal } = useCart();

  const [subtotal, setSubtotal] = useState<number | string>(calculateTotal());
  const taxRate = 0.08;
  const [taxAmount, setTaxAmount] = useState<number | string>(0);

  const [promoCode, setPromoCode] = useState('');
  const [discountSubtotal, setDiscountSubtotal] = useState<number | string>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number | string>(0);

  const [openCheckout, setOpenCheckout] = useState(false);

  const [total, setTotal] = useState<number | string>(0);

  const [validPromo, setValidPromo] = useState<boolean | null>(null);

  useEffect(() => {
    if (cart.length === 0) {
      setSubtotal(0);
      setTaxAmount(0);
      setTotal(0);
      setDiscountSubtotal(0);
      setDiscountedTotal(0);
      return;
    }
    if (validPromo) {
      const discount = calculateTotal() * 0.1;
      const newSubTotal = Number((calculateTotal() - discount).toFixed(2));
      const taxAmount = newSubTotal * taxRate;
      const taxedTotal = newSubTotal + Number(taxAmount);

      setTaxAmount(Number(taxAmount).toFixed(2));
      setDiscountSubtotal(Number(newSubTotal).toFixed(2));
      setTotal(Number(taxedTotal).toFixed(2));
      setSubtotal(Number(calculateTotal()).toFixed(2));

      return;
    }
    const taxAmount = calculateTotal() * taxRate;
    const taxedTotal = calculateTotal() + Number(taxAmount);

    setTaxAmount(Number(taxAmount).toFixed(2));
    setTotal(Number(taxedTotal).toFixed(2));
    setSubtotal(Number(calculateTotal()).toFixed(2));
  }, [cart, validPromo]);

  function handlePromo() {
    if (promoCode === '10OFF') {
      setValidPromo(true);
    } else {
      setValidPromo(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-10 py-36">
      {/* <CartDisplay /> */}
      <div className="container flex flex-col gap-4">
        <div className="flex w-full max-w-full flex-row gap-6 overflow-x-auto p-4">
          {cart.map((item) => (
            <CartItem item={item} variant="cart" />
          ))}
        </div>
        <div id="overview" className="flex w-full flex-col items-center gap-2">
          <h1 className="w-full text-start text-2xl font-bold">Overview</h1>
          <div className="grid w-fit min-w-[50%] grid-cols-3 items-center justify-center gap-4">
            <AnimatePresence>
              {validPromo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="col-span-3 grid grid-cols-3"
                >
                  <p className="col-span-2">Promo : </p>
                  <p className="col-span-1">10% Off</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="col-span-2">Subtotal: </p>
            {validPromo ? (
              <p className="col-span-1 flex flex-row items-center gap-2">
                ${discountSubtotal}
                <span className="text-gray-500 line-through">${subtotal}</span>
              </p>
            ) : (
              <p className="col-span-1">${subtotal}</p>
            )}

            <p className="col-span-2">Tax: </p>
            <p className="col-span-1">${taxAmount}</p>

            <p className="col-span-2">Total: </p>
            <p className="col-span-1">${total}</p>

            <div className="col-span-3 grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Promo Code"
                className="col-span-2 w-full rounded-md bg-muted p-2 text-black shadow-sm placeholder:text-muted-foreground"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={handlePromo}
                className="col-span-1 w-full rounded-md bg-black px-4 py-1 text-white transition-colors duration-300 hover:bg-muted-foreground"
              >
                Apply
              </button>
              <AnimatePresence>
                {validPromo === false && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="col-span-1 text-red-500"
                  >
                    Invalid Promo Code
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                onClick={() => setOpenCheckout((prev) => !prev)}
                className="col-span-3 mt-10 w-full rounded-md bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-muted-foreground"
              >
                Checkout
              </button>
              {openCheckout && <CheckoutModal setIsOpen={setOpenCheckout} amount={Number(total)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
