'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetcher } from '@/utils/fetcher';
import ProductForm from '@/components/ProductForm';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user?.role || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user]);


  useEffect(() => {
    fetcher('http://localhost:8080/api/products').then(setProducts);
  }, []);

  const reload = () =>
    fetcher('http://localhost:8080/api/products').then(setProducts);

  const handleCreate = async (product) => {
    await fetcher('http://localhost:8080/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setShowForm(false);
    reload();
  };

  const handleUpdate = async (product) => {
    await fetcher(`http://localhost:8080/api/products/${editing.id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEditing(null);
    reload();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetcher(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <button
        onClick={() => { setEditing(null); setShowForm(true); }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Add New Guitar
      </button>

      {/* Product Form for Create or Edit */}
      {showForm && (
        <div className="mb-6">
          <ProductForm
            initialData={editing || {}}
            onSubmit={editing ? handleUpdate : handleCreate}
            submitText={editing ? 'Update Guitar' : 'Create Guitar'}
          />
        </div>
      )}

      {/* Products Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Brand</th>
            <th className="border px-2 py-1">Model</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((g) => (
            <tr key={g.id} className="hover:bg-gray-100">
              <td className="border px-2 py-1">{g.id}</td>
              <td className="border px-2 py-1">{g.brand}</td>
              <td className="border px-2 py-1">{g.model}</td>
              <td className="border px-2 py-1">${g.price}</td>
              <td className="border px-2 py-1">{g.stock}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => { setEditing(g); setShowForm(true); }}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No guitars found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
