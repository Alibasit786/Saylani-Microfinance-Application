import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const userRes = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data.user);

      const loanRes = await axios.get('http://localhost:5000/api/loan/my-loans', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (loanRes.data.length > 0) {
        setLoan(loanRes.data[0]);
      }
    } catch (err) {
      console.error(err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p className="text-white text-center mt-16 text-lg">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-center items-center relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-52 h-52 bg-sky-400 rounded-full blur-[100px] opacity-30 top-[10%] left-[20%] animate-[blobMove_10s_ease-in-out_infinite]"></div>
          <div className="absolute w-52 h-52 bg-indigo-500 rounded-full blur-[100px] opacity-30 top-[40%] left-[60%] animate-[blobMove_10s_ease-in-out_infinite] animate-delay-[3s]"></div>
          <div className="absolute w-52 h-52 bg-pink-400 rounded-full blur-[100px] opacity-30 top-[70%] left-[30%] animate-[blobMove_10s_ease-in-out_infinite] animate-delay-[6s]"></div>
        </div>

        {/* Content */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg z-10 w-full max-w-xl text-white">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Welcome, {user?.name}</h2>
          <p className="mb-2">Name: {user?.name}</p>
          <p className="mb-2">CNIC: {user?.cnic}</p>
          <p className="mb-2">Email: {user?.email}</p>

          {loan ? (
            <div className="bg-white/5 p-4 rounded-xl mt-6 border-l-4 border-emerald-400">
              <h3 className="text-lg font-semibold mb-2">Your Loan Application</h3>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Category:</strong> {loan.category} / {loan.subcategory}</p>
              <p><strong>Amount:</strong> {loan.amount}</p>
              <p><strong>City:</strong> {loan.city}</p>
              <p><strong>Country:</strong> {loan.country}</p>
              <p><strong>Deposit:</strong> {loan.deposit}</p>
              <p><strong>Period:</strong> {loan.period} months</p>
              <p><strong>Status:</strong> {loan.status}</p>
              <p><strong>Token Number:</strong> {loan.tokenNumber || 'Not Assigned Yet'}</p>
            </div>
          ) : (
            <button
              className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              onClick={() => router.push('/loan-request')}
            >
              Apply for Loan
            </button>
          )}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        @keyframes blobMove {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default UserDashboard;
