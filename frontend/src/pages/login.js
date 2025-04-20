'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ cnic: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
        {/* Blurred Background Blobs */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-52 h-52 bg-sky-400 rounded-full filter blur-[100px] opacity-30 top-[10%] left-[20%] animate-float" />
          <div className="absolute w-52 h-52 bg-indigo-500 rounded-full filter blur-[100px] opacity-30 top-[40%] left-[60%] animate-float delay-2000" />
          <div className="absolute w-52 h-52 bg-pink-400 rounded-full filter blur-[100px] opacity-30 top-[70%] left-[30%] animate-float delay-4000" />
        </div>

        {/* Login Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              name="cnic"
              placeholder="CNIC"
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md bg-white/20 text-white placeholder:text-slate-200 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-md bg-white/20 text-white placeholder:text-slate-200 outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 transition-colors py-3 rounded-md font-bold text-white"
            >
              Login
            </button>
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.2);
          }
        }
      `}</style>
    </>
  );
};

export default Login;
