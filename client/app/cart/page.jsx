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
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13l-1.5-6M7 13l1.5 6M17 13l-1.5 6"
            />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything yet.</p>
        <a
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
            Browse Products
        </a>
        </div>
    );
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6" >
    <div className="p-6 max-w-4xl pr-0 pl-11 mx-auto border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-white">
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
        <a
            href="/checkout"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
            Proceed to Checkout
            </a>

      </div>
    </div>
    </div>
  );
}
