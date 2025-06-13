'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Quantity</th>
            <th className="text-left py-2">Subtotal</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, brand, model, price, quantity }) => (
            <tr key={id} className="border-b">
              <td className="py-2">{brand} {model}</td>
              <td className="py-2">${price}</td>
              <td className="py-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    updateQuantity(id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="py-2">${(price * quantity).toFixed(2)}</td>
              <td className="py-2">
                <button
                  onClick={() => removeFromCart(id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <strong className="text-xl">Total: ${totalPrice.toFixed(2)}</strong>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
