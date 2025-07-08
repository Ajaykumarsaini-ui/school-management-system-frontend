import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import "./teachermessage.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTeachermessage } from "../../../../CustomHooks/useteachermessage";
import { Link } from "react-router";

const teachermessage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { teachermessage, loading, error, fetch, remove } = useTeachermessage();

  useEffect(() => {
    fetch().unwrap();
  }, [fetch]);

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Loading teacher messages...");
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  const filteredMessage = Array.isArray(teachermessage)
    ? teachermessage.filter((item) =>
        item?.teacher_name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.message?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await remove(id).unwrap();
      toast.success("Message deleted successfully");
      fetch();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete message.");
    }
  };

    const handleChange = (e) => setSearch(e.target.value);


  return (
    <div className="px-4 py-6">
      {/* Navbar */}
      <div className="navbar">
              <div className="search-box">
                <Search className="search-icon cursor-pointer" />
                <input
                  type="text"
                  value={search}
                  onChange={handleChange}
                  placeholder="Search by teacher or reason..."
                />
              </div>
      
              <div className="right-section">
                <div className="profile" onClick={() => setOpen(!open)}>
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Profile"
                    className="avatar"
                  />
                  <div className="profile-info">
                    <p className="name">Luke J R</p>
                    <p className="role">Admin</p>
                  </div>
                  <ChevronDown size={18} />
                </div>
                {open && (
                  <div className="dropdown">
                    <p className="profile-links">Profile</p>
                    <p className="profile-links"> <Link to="/logout">Logout</Link></p>
                   
                  </div>
                )}
              </div>
            </div>
      

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Teacher Messages</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Teacher</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Attachment</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessage.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.teacher_name}</td>
                <td className="px-4 py-3">{item.message}</td>
                <td className="px-4 py-3">
                  <a
                    href={item.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </td>
                <td className="px-4 py-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!filteredMessage.length && (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-400">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default teachermessage;
