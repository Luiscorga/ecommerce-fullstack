'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetcher } from '@/utils/fetcher';
import ProductForm from '@/components/ProductForm';
import TransactionsTable from "../../components/ReusableTable";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  

    const headers = [
    { key: 'id', label: 'ID' },
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'actions', label: 'Actions' },
    { key: 'image_url', label: 'Image' },
  ];

    const tableData = products.map((g) => ({
    ...g,
    actions: (
      <div className="space-x-2">
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
      </div>
    )
  }));

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
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditing(null);
            } else {
              setShowForm(true);
              setEditing(null);
            }
          }}
          className={`mb-4 px-4 py-2 rounded text-white ${
            showForm ? 'bg-gray-600' : 'bg-green-600'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add New Guitar'}
        </button>


      {showForm && (
        <div className="mb-6">
          <ProductForm
            initialData={editing || {}}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            submitText={editing ? 'Update Guitar' : 'Create Guitar'}
          />
        </div>
      )}

          <TransactionsTable
        title="Guitar Inventory"
        description="Manage the guitars listed in your store"
        headers={headers}
        data={tableData}
        imageKeys={['image_url']}
      />
    </div>
  );
}
