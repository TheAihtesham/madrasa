"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const [studentRes, enrollRes] = await Promise.all([
        axios.get("/students"),
        axios.get("/enroll"),
      ]);

      setStudents(studentRes.data);
      setEnrollments(enrollRes.data.filter((e) => e.status === "pending"));
    } catch (error) {
      console.error("Fetch Data Error:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveEnrollment = async (id) => {
    const originalEnrollments = [...enrollments];
    setEnrollments(enrollments.filter(e => e._id !== id));

    try {
      await axios.patch(`/enroll/${id}/approve`);
      fetchData();
      console.log(`Enrollment ${id} approved!`);
    } catch (error) {
      setEnrollments(originalEnrollments);
      alert("Failed to approve enrollment. Please try again.");
    }
  };


  if (loading) {
    return (
      <div className="p-10 text-center bg-gray-50 min-h-screen">
        <p className="text-xl text-blue-600 font-medium">
          <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Dashboard Data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 bg-red-50 border border-red-300 text-red-700 rounded-lg max-w-lg mx-auto mt-10">
        <h2 className="text-xl font-bold mb-2"> Error Loading Data</h2>
        <p>Could not fetch dashboard data. Please check your network connection or the API server status.</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (

      <div className=" md:p-10 bg-gray-50 min-h-screen">

        <h1 className="text-2xl  font-bold text-gray-800 mb-8 border-b pb-3">
          Dashboard
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-500">Total Registered Students</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{students.length}</p>
          </div>

          {/* Pending Enrollments Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{enrollments.length}</p>
          </div>

        </div>


        <div className="flex flex-col gap-8">

          {/* Pending Enrollments  */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">
              🔔 Pending Enrollments
            </h2>
            <hr className="mb-4" />

            {enrollments.length === 0 ? (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg border-l-4 border-green-500">
                <p className="font-medium"> All Clear! No pending enrollment forms.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {enrollments.map((e) => (
                      <tr key={e._id} className="hover:bg-yellow-50 transition duration-150">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{e.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{e.email}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => approveEnrollment(e._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition duration-150 shadow-md"
                            title="Approve Enrollment"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Registered Students */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              🎓 Students
            </h2>
            <hr className="mb-4" />

            <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
              {students.length === 0 ? (
                <p className="text-gray-500">No registered students yet.</p>
              ) : (
                students.map((s) => (
                  <div
                    key={s._id}
                    className="p-3 bg-gray-50 hover:bg-gray-100 transition rounded-lg border-l-4 border-blue-400"
                  >
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

  );
}