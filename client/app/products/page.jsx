'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetcher('http://localhost:8080/api/products').then(setProducts);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
        <p>PRODUCTS</p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto max-w-6xl">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow-md flex flex-col h-85 w-92">
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
              onClick={() => addToCart(product)}
              className="mt-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
