'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoanRequestForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    category: '',
    subcategory: '',
    amount: '',
    deposit: '',
    period: '',
    address: '',
    phone: '',
    city: '',
    country: '',
    statement: '',
    salarySheet: '',
    guarantor1: { name: '', email: '', cnic: '', location: '' },
    guarantor2: { name: '', email: '', cnic: '', location: '' },
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const categories = {
    Wedding: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    'Home Construction': ['Structure', 'Finishing', 'Loan'],
    'Business Startup': ['Buy Stall', 'Advance Rent', 'Assets', 'Machinery'],
    Education: ['University Fees', 'Child Fees Loan'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const path = name.split('.');
    if (path.length === 2) {
      setForm((prev) => ({
        ...prev,
        [path[0]]: {
          ...prev[path[0]],
          [path[1]]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/loan/submit', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message);
      router.push(`/loan/confirmation?loanId=${res.data.loanId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-start py-16 px-4 relative">
        {/* Background Blobs */}
        <div className="absolute w-[250px] h-[250px] bg-indigo-500 rounded-full blur-[100px] opacity-25 top-10 left-10 animate-float" />
        <div className="absolute w-[250px] h-[250px] bg-teal-500 rounded-full blur-[100px] opacity-25 bottom-10 right-10 animate-float delay-3000" />

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-3xl text-white shadow-2xl z-10">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400 text-center drop-shadow-md">Loan Request Form</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="category"
                onChange={handleChange}
                required
                className="bg-gray-900 text-white p-2 rounded-md"
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                name="subcategory"
                onChange={handleChange}
                required
                className="bg-gray-900 text-white p-2 rounded-md"
              >
                <option value="">Select Subcategory</option>
                {form.category &&
                  categories[form.category].map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
              </select>
            </div>

            {[
              { name: 'amount', placeholder: 'Requested Amount (PKR)', type: 'number' },
              { name: 'deposit', placeholder: 'Deposit Amount', type: 'number' },
              { name: 'period', placeholder: 'Loan Period (months)', type: 'number' },
              { name: 'address', placeholder: 'Your Address' },
              { name: 'phone', placeholder: 'Phone Number' },
              { name: 'city', placeholder: 'City' },
              { name: 'country', placeholder: 'Country' },
            ].map(({ name, placeholder, type = 'text' }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                required
                className="bg-gray-900 text-white p-2 rounded-md"
              />
            ))}

            <textarea
              name="statement"
              placeholder="Statement"
              onChange={handleChange}
              required
              className="bg-gray-900 text-white p-2 rounded-md"
            />

            <textarea
              name="salarySheet"
              placeholder="Salary Sheet (Optional)"
              onChange={handleChange}
              className="bg-gray-900 text-white p-2 rounded-md"
            />

            {['guarantor1', 'guarantor2'].map((g, i) => (
              <div key={g}>
                <h3 className="text-blue-400 font-semibold mt-4 mb-2">Guarantor {i + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input name={`${g}.name`} placeholder="Name" onChange={handleChange} className="bg-gray-900 text-white p-2 rounded-md" />
                  <input name={`${g}.email`} placeholder="Email" onChange={handleChange} className="bg-gray-900 text-white p-2 rounded-md" />
                  <input name={`${g}.cnic`} placeholder="CNIC" onChange={handleChange} className=" bg-gray-900 text-white p-2 rounded-md" />
                  <input name={`${g}.location`} placeholder="Location" onChange={handleChange} className="bg-gray-900 text-white p-2 rounded-md" />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 transition-all font-semibold text-lg text-white py-3 rounded-lg shadow-lg"
            >
              Submit Request
            </button>

            {success && <p className="text-green-400 text-center mt-2">{success}</p>}
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoanRequestForm;
