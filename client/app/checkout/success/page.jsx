'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-green-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h2 className="text-3xl font-semibold mb-2">Thank you for your order!</h2>
      <p className="text-gray-600 mb-6">Your items will be shipped soon.</p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
