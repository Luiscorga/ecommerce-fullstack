'use client';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await registerSchema.validate({ email, password }, { abortEarly: false });

      await fetcher('http://localhost:8080/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err) {
      if (err.name === 'ValidationError') {
        setError(err.errors.join(', '));
      } else {
        setError(err.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <button type="submit" className="w-full p-2 bg-green-600 text-white">
          Register
        </button>
      </form>
      {success && <p className="text-green-600 mt-2">Registration completed successfully!</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
