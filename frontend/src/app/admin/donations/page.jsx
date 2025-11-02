"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";
import { Calendar, User, Mail, Phone, IndianRupee, CheckCircle } from "lucide-react";

export default function Donations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const res = await axios.get("/donations");
    setDonations(res.data);
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`/donations/confirm/${id}`);
      fetchDonations();
    } catch (err) {
      console.error(err);
      alert("Failed to confirm donation");
    }
  };

  const totalDonation = donations
    .filter((d) => d.status === "Confirmed")
    .reduce((sum, d) => sum + d.amount, 0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      
      <h2 className="text-2xl font-bold text-green-700 mb-2">Donations Received</h2>
      <p className="text-lg text-gray-700 mb-6">
        Total Confirmed Donations:{" "}
        <span className="font-bold text-green-600">₹{totalDonation}</span>
      </p>

      {donations.length === 0 ? (
        <p className="text-gray-600">No donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {donations.map((d) => (
            <div
              key={d._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                  <User size={16} /> {d.donorName || "Anonymous"}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    d.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <p className="flex items-center gap-1 text-gray-600 mt-1">
                <IndianRupee size={14} /> {d.amount}
              </p>
              <p className="flex items-center gap-1 text-gray-600">
                <Mail size={14} /> {d.email || "N/A"}
              </p>
              <p className="flex items-center gap-1 text-gray-600">
                <Phone size={14} /> {d.contact || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-2">{d.message || "—"}</p>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <Calendar size={12} /> {formatDate(d.date)}
              </p>

              {d.status === "Pending" && (
                <button
                  onClick={() => handleConfirm(d._id)}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Confirm Payment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
