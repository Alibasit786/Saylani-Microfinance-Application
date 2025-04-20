import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch (err) {
      setError("Failed to load applications");
    }
  };

  const handleTokenAssign = async (id) => {
    const token = localStorage.getItem("token");
    const tokenNumber = prompt("Enter Token Number");
    if (!tokenNumber) return;

    try {
      await axios.put(
        `http://localhost:5000/api/admin/applications/${id}`,
        { tokenNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Token assigned");
      fetchApplications();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to assign token");
    }
  };

  const filteredApps = filter
    ? applications.filter((app) =>
        app.address.toLowerCase().includes(filter.toLowerCase())
      )
    : applications;

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-start py-16 px-4 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute w-52 h-52 bg-indigo-500 rounded-full blur-[120px] opacity-25 top-5 left-10 animate-float" />
        <div className="absolute w-52 h-52 bg-teal-500 rounded-full blur-[120px] opacity-25 bottom-5 right-10 animate-float delay-3000" />

        {/* Dashboard Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg w-full max-w-screen-xl p-8 rounded-2xl shadow-2xl text-white">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Admin Dashboard
          </h2>

          <input
            type="text"
            placeholder="Filter by city/country"
            className="w-full p-3 mb-4 bg-white/20 rounded-lg text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter(e.target.value)}
          />

          {success && (
            <p className="text-green-400 text-center mb-4">{success}</p>
          )}
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-white">
              <thead>
                <tr className="bg-white/10 text-sky-300">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Guarantors</th>
                  <th className="px-4 py-2 text-left">Token</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app._id} className="even:bg-white/5">
                    <td className="px-4 py-2">{app.user?.name}</td>
                    <td className="px-4 py-2">
                      {app.category} / {app.subcategory}
                    </td>
                    <td className="px-4 py-2">{app.amount}</td>
                    <td className="px-4 py-2">{app.address}</td>
                    <td className="px-4 py-2">
                      <ul className="list-disc list-inside">
                        {app.guarantors?.map((g, i) => (
                          <li key={i}>
                            {i + 1}: {g.name} ({g.cnic})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">
                      {app.tokenNumber || "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleTokenAssign(app._id)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md font-semibold transition"
                      >
                        Assign Token
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredApps.length === 0 && (
              <p className="text-gray-300 text-center mt-4">
                No applications found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
