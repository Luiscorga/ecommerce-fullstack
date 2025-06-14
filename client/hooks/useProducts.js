// hooks/useProducts.js
import { useEffect, useState, useCallback } from 'react';
import { fetcher } from '@/utils/fetcher';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await fetcher('http://localhost:8080/api/products');
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const createProduct = async (product, token) => {
    await fetcher('http://localhost:8080/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  const updateProduct = async (id, product, token) => {
    await fetcher(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  const deleteProduct = async (id, token) => {
    await fetcher(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
