"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";
import {
    Calendar,
    Phone,
    Globe,
    User,
    Cake,
    Pencil,
    Trash2,
    Search,
    UserCheck,
} from "lucide-react";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", contact: "" });

    useEffect(() => {
        fetchStudents();

    }, []);

    const fetchStudents = async () => {
        const res = await axios.get("/students");
        setStudents(res.data);
    };
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this student?")) {
            await axios.delete(`/students/${id}`);
            fetchStudents();
        }
    };

    const handleEdit = (student) => {
        setEditing(student._id);
        setFormData({ name: student.name, email: student.email, contact: student.contact });
    };

    const handleSave = async (id) => {
        await axios.put(`/students/${id}`, formData);
        setEditing(null);
        fetchStudents();
    };

    const filteredStudents = students.filter(
        (s) =>
            s.name?.toLowerCase().includes(search.toLowerCase()) ||
            s.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🎓 Registered Students</h2>
            <div className="flex items-center gap-3 mb-8">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {filteredStudents.length === 0 ? (
                <p className="text-gray-600 text-lg">No students found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map((s) => (
                        <div key={s._id} className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <User className="text-green-600" size={20} />
                                    {editing === s._id ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="border-b border-green-400 text-lg font-semibold focus:outline-none"
                                        />
                                    ) : (
                                        <h3 className="text-lg font-semibold text-green-700">{s.name}</h3>
                                    )}
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{s.gender || "—"}</span>
                            </div>

                            <div className="space-y-2 text-gray-700 text-sm mb-4">
                                <p><strong>Email:</strong> {editing === s._id ? <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-b border-green-400 focus:outline-none" /> : <span className="text-blue-700">{s.email || "—"}</span>}</p>
                                <p className="flex items-center gap-1"><Phone size={14} className="text-gray-500" /> {editing === s._id ? <input type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="border-b border-green-400 focus:outline-none" /> : s.contact || "—"}</p>
                                <p className="flex items-center gap-1"><Globe size={14} className="text-gray-500" /> {s.nationality || "—"}</p>
                                <p className="flex items-center gap-1"><Cake size={14} className="text-gray-500" /> DOB: {formatDate(s.dob)}</p>
                                <p className="flex items-center gap-1"><Calendar size={14} className="text-gray-500" /> Admission: {formatDate(s.admissionDate)}</p>
                            </div>

                            <div className="mt-auto flex flex-col gap-2">
                                <div className="flex justify-between">
                                    {editing === s._id ? (
                                        <button
                                            onClick={() => handleSave(s._id)}
                                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition w-full"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => handleEdit(s)}
                                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                            >
                                                <Pencil size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
