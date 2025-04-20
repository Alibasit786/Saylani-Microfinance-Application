'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function LoanCalculator() {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [amount, setAmount] = useState('');
  const [deposit, setDeposit] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleCalculate = () => {
    const principal = parseInt(amount) - parseInt(deposit);
    const monthly = principal / (parseInt(period) * 12);
    setResult({ principal, monthly });
  };

  const handleProceed = () => {
    if (!category || !subcategory || !amount || !deposit || !period) {
      alert('Please fill all fields before proceeding.');
      return;
    }

    localStorage.setItem('loanInputs', JSON.stringify({ category, subcategory, amount, deposit, period }));
    router.push('/register');
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute w-52 h-52 bg-sky-400 rounded-full blur-[100px] opacity-30 animate-blob top-[10%] left-[20%]" />
        <div className="absolute w-52 h-52 bg-purple-400 rounded-full blur-[100px] opacity-30 animate-blob bottom-[15%] right-[20%] animation-delay-2000" />
        <div className="absolute w-52 h-52 bg-pink-400 rounded-full blur-[100px] opacity-30 animate-blob top-[50%] left-[55%] animation-delay-4000" />

        {/* Calculator Card */}
        <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl text-white">
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400 drop-shadow-sm">
            Loan Calculator
          </h2>

          <div className="flex flex-col gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="Wedding">Wedding</option>
              <option value="Home Construction">Home Construction</option>
              <option value="Business Startup">Business Startup</option>
              <option value="Education">Education</option>
            </select>

            <input
              type="text"
              placeholder="Subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Initial Deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Loan Period (in years)"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Calculate
            </button>

            {result && (
              <div className="bg-white/20 rounded-md p-4 text-white">
                <p><strong>Principal:</strong> PKR {result.principal}</p>
                <p><strong>Monthly Installment:</strong> PKR {result.monthly.toFixed(2)}</p>
              </div>
            )}

            <button
              onClick={handleProceed}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
