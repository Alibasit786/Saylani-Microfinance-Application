import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';

const GuarantorsPage = () => {
  const router = useRouter();
  const { loanId } = router.query;

  const [guarantors, setGuarantors] = useState([
    { name: '', email: '', cnic: '', location: '' },
    { name: '', email: '', cnic: '', location: '' },
  ]);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...guarantors];
    updated[index][field] = value;
    setGuarantors(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/loan/guarantors', {
        loanId,
        guarantors,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Guarantors added successfully!');
      setError('');
      // ✅ Optional: Redirect to user dashboard after success
      setTimeout(() => router.push('/dashboard/user'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add guarantors');
      setSuccess('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Add Guarantors</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {guarantors.map((g, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-2">Guarantor {i + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
              <input
  type="number"
  name="deposit"
  placeholder="Deposit Amount"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

<input
  type="number"
  name="period"
  placeholder="Repayment Period (in months)"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="city"
  placeholder="City"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="country"
  placeholder="Country"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

<textarea
  name="statement"
  placeholder="Why are you applying for the loan?"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="salarySheet"
  placeholder="Salary Sheet (e.g., link or filename)"
  className="w-full p-2 border rounded"
  onChange={handleChange}
  required
/>

              </div>
            </div>
          ))}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Submit Guarantors
          </button>
        </form>

        {success && <p className="text-green-600 mt-4">{success}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </>
  );
};

export default GuarantorsPage;
