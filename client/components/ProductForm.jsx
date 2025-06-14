'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as yup from 'yup';

// Define validation schema with yup
const schema = yup.object().shape({
  brand: yup.string().required('Brand is required'),
  model: yup.string().required('Model is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  imageUrl: yup.string().url('Must be a valid URL').required('Image URL is required'),
});

export default function ProductForm({ initialData = {}, onSubmit, submitText }) {
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brand: initialData.brand || '',
      model: initialData.model || '',
      description: initialData.description || '',
      price: initialData.price || '',
      stock: initialData.stock || '',
      imageUrl: initialData.image_url || '',
    },
  });

  // Reset form when initialData changes (e.g. editing)
  useEffect(() => {
    reset({
      brand: initialData.brand || '',
      model: initialData.model || '',
      description: initialData.description || '',
      price: initialData.price || '',
      stock: initialData.stock || '',
      imageUrl: initialData.image_url || '',
    });
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
  const product = {
    brand: data.brand,
    model: data.model,
    description: data.description,
    price: parseFloat(data.price),
    stock: parseInt(data.stock, 10),
    image_url: data.imageUrl,
  };

  onSubmit(product);
  setSuccessMessage('Product saved successfully!');

  setTimeout(() => setSuccessMessage(''), 3000);
};

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 max-w-lg mx-auto mt-6">
      <div>
        <input
          type="text"
          placeholder="Brand"
          {...register('brand')}
          className={`w-full p-2 border rounded ${errors.brand ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.brand && <p className="text-red-600 text-sm mt-1">{errors.brand.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Model"
          {...register('model')}
          className={`w-full p-2 border rounded ${errors.model ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.model && <p className="text-red-600 text-sm mt-1">{errors.model.message}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          {...register('description')}
          className={`w-full p-2 border rounded ${errors.description ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          {...register('price')}
          className={`w-full p-2 border rounded ${errors.price ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Stock"
          step="1"
          {...register('stock')}
          className={`w-full p-2 border rounded ${errors.stock ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Image URL"
          {...register('imageUrl')}
          className={`w-full p-2 border rounded ${errors.imageUrl ? 'border-red-600' : 'border-gray-300'}`}
        />
        {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm py-2.5 text-center"
      >
        {submitText}
      </button>

      {successMessage && (
        <p className="text-green-600 text-center mt-2">{successMessage}</p>
      )}
    </form>
  );
}
