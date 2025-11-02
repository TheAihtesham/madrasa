"use client";
import { useEffect, useState } from "react";
import axios from "../../../../lib/axios";
import { Trash2, PlusCircle, Calendar, FileText, FileDown, Upload } from "lucide-react";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [search, setSearch] = useState("");

  const fetchNotices = async () => {
    const res = await axios.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.description) return;

    const formData = new FormData();
    formData.append("title", newNotice.title);
    formData.append("description", newNotice.description);
    if (newNotice.file) formData.append("pdf", newNotice.file);

    await axios.post("/notices", formData);

    setNewNotice({ title: "", description: "", file: null });
    fetchNotices();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    await axios.delete(`/notices/${id}`);
    fetchNotices();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredNotices = notices.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Notices Management</h2>
      <form
        onSubmit={handleCreate}
        className="bg-white border rounded-xl shadow p-6 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
          <PlusCircle size={22} /> Create New Notice
        </h3>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />

          <textarea
            placeholder="Notice Description"
            rows="3"
            value={newNotice.description}
            onChange={(e) =>
              setNewNotice({ ...newNotice, description: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />

          {/* PDF Upload UI */}
          <label className="flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100">
            <Upload size={18} className="text-gray-600" />
            <span className="text-gray-700 text-sm">
              {newNotice.file ? newNotice.file.name : "Upload PDF (optional)"}
            </span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setNewNotice({ ...newNotice, file: e.target.files[0] })
              }
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Post Notice
          </button>
        </div>
      </form>


      {/* Notice Cards */}
      {filteredNotices.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No notices found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {filteredNotices.map((n) => (
            <div
              key={n._id}
              className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <FileText size={18} /> {n.title}
                </h3>

                <button
                  onClick={() => handleDelete(n._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="text-gray-700 mt-2 text-sm">{n.description}</p>

              <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
                <Calendar size={14} /> {formatDate(n.createdAt)}
              </p>
              {n.pdf && (
                <a
                  href={n.pdf}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-3 text-sm bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100"
                >
                  <FileDown size={14} /> View PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
