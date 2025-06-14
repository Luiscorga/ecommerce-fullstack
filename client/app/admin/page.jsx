'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import ProductForm from '@/components/ProductForm';
import TransactionsTable from '@/components/ReusableTable';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user?.role || user.role !== 'admin') {
      router.push('/login');
    }
  }, [user]);

  const handleCreate = async (product) => {
    await createProduct(product, localStorage.getItem('token'));
  };

  const handleUpdate = async (product) => {
    await updateProduct(editing.id, product, localStorage.getItem('token'));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id, localStorage.getItem('token'));
  };

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
          onClick={() => {
            setEditing(g);
            setShowForm(true);
          }}
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
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) setEditing(null);
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
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
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
