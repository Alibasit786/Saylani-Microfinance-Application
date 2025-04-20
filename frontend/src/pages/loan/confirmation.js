import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ConfirmationPage = () => {
  const router = useRouter();
  const { loanId } = router.query;

  const [loan, setLoan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoan = async () => {
      const token = localStorage.getItem('token');
      if (!loanId || !token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/loan/my-loans', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const foundLoan = res.data.find((loan) => loan._id === loanId);
        if (foundLoan) {
          setLoan(foundLoan);
        } else {
          setError('Loan not found');
        }
      } catch (err) {
        setError('Failed to load loan details');
      }
    };

    fetchLoan();
  }, [loanId]);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 overflow-hidden flex justify-center items-start pt-20">
        {/* Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-72 h-72 bg-green-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-float" />
          <div className="absolute w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-3xl bottom-10 right-10 animate-float delay-3000" />
        </div>

        {/* Confirmation Card */}
        <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Loan Submitted Successfully </h1>

          {error && <p className="text-red-400 text-center">{error}</p>}

          {loan ? (
            <div className="space-y-4">
              <p><span className="font-semibold text-yellow-300">Category:</span> {loan.category}</p>
              <p><span className="font-semibold text-yellow-300">Subcategory:</span> {loan.subcategory}</p>
              <p><span className="font-semibold text-yellow-300">Amount:</span> PKR {loan.amount}</p>
              <p><span className="font-semibold text-yellow-300">Status:</span> {loan.status}</p>
              <p><span className="font-semibold text-yellow-300">Phone:</span> {loan.phone}</p>
              <p><span className="font-semibold text-yellow-300">Address:</span> {loan.address}</p>
              <p><span className="font-semibold text-yellow-300">City:</span> {loan.city}</p>
              <p><span className="font-semibold text-yellow-300">Country:</span> {loan.country}</p>

              <p className="mt-4 text-blue-400 italic text-sm">
                Please wait for your appointment slip to be generated.
              </p>

              <div className="text-center mt-6">
                <button
                  onClick={() => router.push(`/loan/slip/${loanId}`)}
                  className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  📄 Generate Slip
                </button>
              </div>
            </div>
          ) : (
            !error && (
              <p className="text-center text-gray-300 animate-pulse">Loading loan details...</p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
