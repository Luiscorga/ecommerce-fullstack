'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts'; // ⬅️ import hook
import Slide from "@/components/SlideBanner";

export default function HomePage() {
  const { user } = useAuth();
  const { products, loading } = useProducts(); // ⬅️ use hook
  const featured = products.slice(0, 4);        // ⬅️ take top 4

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Guitar Oracle</h1>
        <p className="text-lg text-gray-600 mb-6">The best guitars around.</p>
        <Slide />
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Guitars</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {featured.map((product) => (
              <div key={product.id} className="border rounded-xl p-4 shadow-md flex flex-col">
                <img
                  src={product.image_url}
                  alt={product.model}
                  className="h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-bold">{product.brand} {product.model}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="font-semibold text-red-600">${product.price}</p>
                <Link
                  href="/products"
                  className="mt-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 text-center"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* The rest remains the same... */}


      <section className="bg-gray-100 p-6 rounded-xl text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="text-4xl">🚚</span>
            <p className="font-medium">Free Shipping</p>
          </div>
          <div>
            <span className="text-4xl">💳</span>
            <p className="font-medium">Secure Payments</p>
          </div>
          <div>
            <span className="text-4xl">📦</span>
            <p className="font-medium">Easy Returns</p>
          </div>
          <div>
            <span className="text-4xl">🛠️</span>
            <p className="font-medium">1-Year Warranty</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Products</Link>
          {user && user.role !== 'admin' && (
            <Link href="/cart" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Cart</Link>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Admin Panel</Link>
          )}
          {!user && (
            <Link href="/login" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Login</Link>
          )}
        </div>
      </section>
    </main>
  );
}