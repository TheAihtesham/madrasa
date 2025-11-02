"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", description: "" });
  const [summary, setSummary] = useState({ totalFunds: 0, totalExpense: 0, remainingBalance: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/expenses");
      setExpenses(res.data.expenses || []);
      setSummary({
        totalFunds: res.data.totalFunds || 0,
        totalExpense: res.data.totalExpense || 0,
        remainingBalance: res.data.remainingBalance || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load expense data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    if (!form.title || !form.amount) {
      return alert("Please enter both a Title and an Amount.");
    }
    setSubmitting(true);
    try {
      await axios.post("/expenses", form);
      setForm({ title: "", amount: "", description: "" });
      await fetchData();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteExpense = async (id) => {

    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e._id !== id));
      await fetchData();
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-extrabold text-gray-800 border-b pb-3">
        Expense
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Funds Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-500 transform hover:scale-[1.02] transition duration-200">
          <p className="text-sm font-semibold text-blue-600 uppercase">Total Funds</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
            {loading ? '...' : formatCurrency(summary.totalFunds)}
          </h3>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 transform hover:scale-[1.02] transition duration-200">
          <p className="text-sm font-semibold text-red-600 uppercase">Total Expense</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
            {loading ? '...' : formatCurrency(summary.totalExpense)}
          </h3>
        </div>

        {/* Remaining Balance Card */}
        <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${summary.remainingBalance >= 0 ? 'border-green-500' : 'border-yellow-500'
          } transform hover:scale-[1.02] transition duration-200`}>
          <p className="text-sm font-semibold text-gray-500 uppercase">Remaining Balance</p>
          <h3 className="text-3xl font-extrabold ${
              summary.remainingBalance >= 0 ? 'text-green-600' : 'text-yellow-600'
            } mt-1">
            {loading ? '...' : formatCurrency(summary.remainingBalance)}
          </h3>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-xxl font-bold text-gray-700 mb-4 flex items-center">
          Record New Expense
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={(e) => { e.preventDefault(); addExpense(); }}>

          {/* Title Input */}
          <div className="md:col-span-1">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Expense Title (e.g., Office Supplies)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition duration-150"
              required
            />
          </div>

          {/* Amount Input */}
          <div className="md:col-span-1">
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount (₹)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition duration-150"
              min="1"
              required
            />
          </div>

          {/* Description Input */}
          <div className="md:col-span-1">
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description (Optional)"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg transition duration-150"
            />
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              onClick={addExpense}
              disabled={submitting}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition duration-150 shadow-md ${submitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {submitting ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>


      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">

        {loading ? (
          <p className="p-6 text-gray-500">Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <div className="p-6 bg-gray-50 text-gray-600 border-t">
            <p> No expenses recorded. Keep up the good savings!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {expenses.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="p-4 font-medium text-gray-800">{e.title}</td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{e.description || '-'}</td>
                    <td className="p-4 text-right">
                      {formatCurrency(e.amount)}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(e.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteExpense(e._id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-600 transition shadow-sm"
                        title="Delete Expense"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}