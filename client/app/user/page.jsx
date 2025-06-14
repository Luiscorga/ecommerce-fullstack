'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { User, ShoppingCart, LogOut, PackageSearch } from 'lucide-react';

export default function UserPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6" >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-full">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Hello, {user.name || user.email}</h1>
            <p className="text-sm text-gray-500">Welcome to your user panel</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/products"
            className="flex items-center justify-between px-5 py-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            <span className="font-medium">Browse Products</span>
            <PackageSearch className="w-5 h-5" />
          </Link>

          <Link
            href="/cart"
            className="flex items-center justify-between px-5 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            <span className="font-medium">View Cart</span>
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>

        <hr className="my-6" />

        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
