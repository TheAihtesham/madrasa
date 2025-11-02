"use client";
import { useState, useEffect } from "react";
import axios from "../../../lib/axios";
import Navbar from "../components/Navbar";

export default function DonationPage() {
  const [form, setForm] = useState({
    donorName: "",
    amount: "",
    email: "",
    contact: "",
    message: "",
  });
  const [qrData, setQrData] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/donations/create-link", form);
      setQrData(res.data);
      setIsConfirming(true);

      // On mobile, automatically open UPI link
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = res.data.upiLink;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create donation link");
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post("/donations/add-donation", form);
      alert("✅ Donation confirmed! Thank you for your support.");
      setForm({ donorName: "", amount: "", email: "", contact: "", message: "" });
      setQrData(null);
      setIsConfirming(false);
    } catch (err) {
      console.error(err);
      alert("Error confirming donation");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 mt-10">
         <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-green-700">💚 Donate to Madrasa</h1>

      {!isConfirming ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={form.donorName}
            onChange={(e) => setForm({ ...form, donorName: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Amount (INR)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Contact (optional)"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Proceed to Pay
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
          <h2 className="text-xl font-semibold text-green-700">Scan & Pay</h2>

          {!isMobile && qrData?.qrUrl && (
            <>
              <img
                src={qrData.qrUrl}
                alt="UPI QR"
                className="mx-auto w-64 h-64"
              />
              <p className="text-gray-600">Amount: ₹{qrData.amount}</p>
            </>
          )}

          {isMobile && (
            <a
              href={qrData.upiLink}
              className="text-blue-600 underline block text-lg"
            >
              💰 Open UPI App to Pay
            </a>
          )}

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}
