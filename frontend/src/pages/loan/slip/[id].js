import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import Navbar from '../../../components/Navbar';
import { motion } from 'framer-motion';

const SlipPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady || !id) return;

    const fetchSlip = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`http://localhost:5000/api/loan/slip/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("❌ Error fetching slip:", err.response?.data || err.message);
        setError('Failed to fetch slip');
      }
    };

    fetchSlip();
  }, [router.isReady, id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-indigo-900 text-white p-6 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <div className="absolute w-72 h-72 bg-blue-900 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
          <div className="absolute w-72 h-72 bg-purple-900 opacity-20 rounded-full blur-3xl top-40 right-10 animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto p-8 mt-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Loan Appointment Slip</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}
          {!data && !error && <p className="text-center text-gray-300">Loading...</p>}

          {data && (
            <div className="text-md space-y-3">
              <p><span className="font-semibold text-yellow-300">Name:</span> {data.user.name}</p>
              <p><span className="font-semibold text-yellow-300">CNIC:</span> {data.user.cnic}</p>
              <p><span className="font-semibold text-yellow-300">Loan Category:</span> {data.category} / {data.subcategory}</p>
              <p><span className="font-semibold text-yellow-300">Loan Amount:</span> PKR {data.amount}</p>
              <p><span className="font-semibold text-yellow-300">Token Number:</span> {data.tokenNumber}</p>
              <p><span className="font-semibold text-yellow-300">Appointment:</span> {data.appointment?.date} at {data.appointment?.time}</p>
              <p><span className="font-semibold text-yellow-300">Office:</span> {data.appointment?.location}</p>

              <div className="flex justify-center py-4">
                <QRCode
                  value={JSON.stringify({
                    name: data.user.name,
                    cnic: data.user.cnic,
                    token: data.tokenNumber,
                    date: data.appointment?.date,
                  })}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handlePrint}
                  className="mt-4 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full font-semibold text-white shadow-lg"
                >
                  🖨️ Print / Download Slip
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default SlipPage;
