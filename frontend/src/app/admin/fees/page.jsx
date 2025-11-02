"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";

export default function AdminFees() {
    const [fees, setFees] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);

    const fetchFees = async () => {
        const res = await axios.get("/fees");
        setFees(res.data);

        let paid = 0;

        res.data.forEach((fee) => {
            if (fee.status === "Paid") paid += fee.amount;
        });

        setTotalPaid(paid);
    };


    const handleToggle = async (id) => {
        setFees((prev) =>
            prev.map((fee) =>
                fee._id === id
                    ? { ...fee, status: fee.status === "Paid" ? "Unpaid" : "Paid" }
                    : fee
            )
        );

        await axios.put(`/fees/${id}/toggle`);
        fetchFees();
    };

    useEffect(() => {
        fetchFees();
    }, []);

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-5"> Student Fees</h2>

            {/*  Total Amount Section */}
            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-lg font-semibold text-green-800">
                <p>Total Fees: ₹{totalPaid}</p>
            </div>
            <table className="w-full border rounded-lg overflow-hidden shadow-md text-center">
                <thead className="bg-green-100">
                    <tr className="font-semibold text-green-700">
                        <th className="p-2">Student</th>
                        <th className="p-2">Month</th>
                        <th className="p-2">Year</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Paid?</th>
                    </tr>
                </thead>

                <tbody>
                    {fees.map((fee) => (
                        <tr key={fee._id} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">{fee.studentId?.name}</td>
                            <td className="p-2">{fee.month}</td>
                            <td className="p-2">{fee.year}</td>
                            <td className="p-2 font-semibold text-green-700">₹{fee.amount}</td>

                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={fee.status === "Paid"}
                                    onChange={() => handleToggle(fee._id)}
                                    className="h-5 w-5 accent-green-600 cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
