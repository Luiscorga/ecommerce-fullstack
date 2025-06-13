'use client';
import { useState, useEffect } from 'react';

export default function ProductForm({ initialData = {}, onSubmit, submitText }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setBrand(initialData.brand || '');
      setModel(initialData.model || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setStock(initialData.stock || '');
      setImageUrl(initialData.image_url || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brand || !model || !description || !price || !stock || !imageUrl) {
      alert('All fields are required');
      return;
    }

    const product = {
      brand,
      model,
      description,
      price: parseFloat(price),
      stock,
      image_url: imageUrl,
    };

    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-6">
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Stock"
        step="1"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        {submitText}
      </button>
    </form>
  );
}
