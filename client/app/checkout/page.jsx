'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

     /*
     useEffect(() => {
        if (cart.length === 0) {
        router.push('/cart');
        }
    }, [cart, router]);
    
    */

  const handlePlaceOrder = () => {
    clearCart();
    router.push('/checkout/success');
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <ul className="divide-y border mb-6">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex justify-between">
            <div>
              <p className="font-semibold">{item.brand} {item.model}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p>${(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="text-right text-xl font-bold mb-6">
        Total: ${total.toFixed(2)}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
}
