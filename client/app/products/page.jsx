'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useCart } from '@/context/CartContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastAddedId, setLastAddedId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetcher('http://localhost:8080/api/products').then(setProducts);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 5000);
  };

  const filteredProducts = products.filter((product) =>
    `${product.brand} ${product.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6" >
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Products</h1>
      <div className="max-w-2xl mx-auto mb-6 relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-white"
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto max-w-6xl "> 
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border border-white rounded-xl p-4 shadow-md flex flex-col relative bg-white">
            <img
              src={product.image_url}
              alt={product.model}
              className="h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-bold">
              {product.brand} {product.model}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="font-semibold text-red-600">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {lastAddedId === product.id && (
              <div className="mt-2 text-sm text-green-600 bg-green-100 rounded px-2 py-1 text-center">
                Added to cart!
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
