"use client";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import Navbar from "../components/Navbar";
import { Search, Bell, Calendar } from "lucide-react";

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await axios.get("/notices");
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotices(sorted);
    };
    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <section className="max-w-4xl mx-auto mt-12 px-4 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-30">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-green-700">
            <Bell size={26} />
            All Notices
          </h1>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>

        {/* Notices List */}
        {filteredNotices.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No matching notices found.
          </p>
        ) : (
          <div className="grid gap-6">
            {filteredNotices.map((n) => (
              <div
                key={n._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-green-800">{n.title}</h2>
                  <span className="text-xs flex items-center gap-1 text-gray-500">
                    <Calendar size={14} />
                    {formatDate(n.createdAt)}
                  </span>
                </div>

                <p className="text-gray-700 mt-2 leading-relaxed text-sm">
                  {n.description || "No content available"}
                </p>

                {/* PDF Button */}
                {n.pdf && (
                  <a
                    href={n.pdf}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-green-600 mt-3 text-sm font-medium hover:underline"
                  >
                    📄 View PDF Notice
                  </a>
                )}
              </div>

            ))}
          </div>
        )}
      </section>
    </div>
  );
}
