'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetcher } from '@/utils/fetcher';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });

      const data = await fetcher('http://localhost:8080/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      login(data.token);
      router.push('/');
    } catch (err) {
      if (err.name === 'ValidationError') {
        setError(err.errors.join(', '));
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full p-2 bg-blue-600 text-white">Login</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 text-center">
        <p>Don't have an account?</p>
        <button
          onClick={() => router.push('/registration')}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
