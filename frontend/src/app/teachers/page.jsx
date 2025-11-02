"use client";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import Navbar from "../components/Navbar";
import { User, Mail, Phone, BookOpen, Search } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("/teachers");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTeachers(sorted);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <section className="max-w-6xl mx-auto mt-12 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-green-700">
            <User size={26} />
            Faculty Members
          </h1>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>

        {/* Teachers grid */}
        {filteredTeachers.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No teachers found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredTeachers.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <User size={18} />
                  {t.name}
                </h2>

                <p className="text-sm text-gray-600 mt-2">{t.bio || "No bio available."}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-green-500" />
                    <span>{t.email}</span>
                  </div>
                  {t.contact && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-green-500" />
                      <span>{t.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-green-500" />
                    <span>
                      {t.course}{" "}
                      {t.courseDuration && `(${t.courseDuration} months)`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}







