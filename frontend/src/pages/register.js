'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', cnic: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccess('Registered successfully! Check your email for your password.');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error registering user. Try again later.');
      console.error('Registration error:', err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 px-4 font-sans">
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-52 h-52 bg-sky-400 rounded-full blur-[100px] opacity-30 animate-blob top-[15%] left-[20%]" />
          <div className="absolute w-52 h-52 bg-purple-400 rounded-full blur-[100px] opacity-30 animate-blob top-[45%] left-[70%] animation-delay-2000" />
          <div className="absolute w-52 h-52 bg-pink-400 rounded-full blur-[100px] opacity-30 animate-blob bottom-[10%] left-[35%] animation-delay-4000" />
        </div>

        {/* Register Card */}
        <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl text-white">
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400 drop-shadow-sm">
            Register
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="cnic"
              placeholder="CNIC"
              onChange={handleChange}
              required
              className="bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Register
            </button>

            {success && <p className="text-green-400 text-center font-medium">{success}</p>}
            {error && <p className="text-red-400 text-center font-medium">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
