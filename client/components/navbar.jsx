"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
   const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

   const logoutNav = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyStore
        </Link>

        <button className="md:hidden" onClick={toggleMenu}>
          ☰
        </button>

        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0`}
        >
          <li>
            <Link href="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-gray-300">Products</Link>
          </li>
          {user && user?.role !== 'admin' && (
            <li>
              <Link href="/cart" className="hover:text-gray-300">Cart</Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <li>
              <Link href="/admin" className="hover:text-gray-300">Admin Panel</Link>
            </li>
          )}
          {user ? (
            <li>
              <button
                onClick={logoutNav}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="hover:text-gray-300">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
