"use client"
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";
import { User, Mail, Phone, BookOpen, Trash, Edit } from "lucide-react";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    bio: "",
    course: "",
    courseDuration: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/teachers");
      setTeachers(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`/teachers/${editingId}`, form);
        alert("Teacher updated successfully!");
        setEditingId(null);
      } else {
        // Add new
        await axios.post("/teachers", form);
        alert("Teacher added successfully!");
      }
      setForm({ name: "", email: "", contact: "", bio: "", course: "", courseDuration: "" });
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error saving teacher.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await axios.delete(`/teachers/${id}`);
      alert("Teacher deleted!");
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Error deleting teacher");
    }
  };

  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name,
      email: teacher.email,
      contact: teacher.contact || "",
      bio: teacher.bio || "",
      course: teacher.course || "",
      courseDuration: teacher.courseDuration || "",
    });
    setEditingId(teacher._id);
  };

  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Manage Teachers</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            {editingId ? "Edit Teacher" : "Add New Teacher"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Course</option>
              <option value="الدورة الأولى">الدورة الأولى</option>
              <option value="الدورة الثانية">الدورة الثانية</option>
              <option value="الدورة الثالثة">الدورة الثالثة</option>
              <option value="الدورة الرابعة">الدورة الرابعة</option>
              <option value="الدورة الخامسة">الدورة الخامسة</option>
              <option value="الدورة السادسة">الدورة السادسة</option>
            </select>

            <input
              type="number"
              name="courseDuration"
              value={form.courseDuration}
              onChange={handleChange}
              placeholder="Course Duration (months)"
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all relative"
            >
              <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                <User size={18} />
                {t.name}
              </h3>
              <p className="text-gray-700 mt-1 text-sm">{t.bio || "No bio"}</p>
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-green-500" /> {t.email}
                </p>
                {t.contact && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-green-500" /> {t.contact}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <BookOpen size={14} className="text-green-500" /> {t.course}{" "}
                  {t.courseDuration && `(${t.courseDuration} months)`}
                </p>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit Teacher"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Teacher"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
