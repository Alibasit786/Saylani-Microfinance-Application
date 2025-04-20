import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/user/change-password',
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative p-6 overflow-hidden">
        {/* Blobs */}
        <div className="absolute w-52 h-52 rounded-full bg-indigo-600 opacity-25 blur-[120px] top-[10%] left-[10%] animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute w-52 h-52 rounded-full bg-teal-500 opacity-25 blur-[120px] bottom-[5%] right-[15%] animate-[float_10s_ease-in-out_infinite] animate-delay-[2s]"></div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md text-white shadow-2xl z-10">
          <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">Change Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="p-3 rounded-lg bg-white/10 text-white placeholder-slate-300 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Change Password
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-400">{message}</p>}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default ChangePassword;
