import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Search, ChevronDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../../../components/Button";
import { useTeacherleave } from "../../../../CustomHooks/useTeacherleave";
import "./teacherleave.scss";

const Teacherleavepage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { teacherleave, loading, error, fetch, update , remove } = useTeacherleave();
  const { id } = useParams();

  const handleChange = (e) => setSearch(e.target.value);

  const handleStatusUpdate = (leave, status) => {
    update(leave._id, status).then(() => {
      toast.success(`Leave ${status.toLowerCase()} successfully!`);
    });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (loading) {
      toast.dismiss();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);


  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this leave?")) {
        remove(id)
          .then(() => {
            toast.success("Leave deleted successfully");
          })
          .catch(() => {
            toast.error("Failed to delete leave");
          });
      }
    };

  const filteredLeaves = Array.isArray(teacherleave)
    ? teacherleave.filter((item) => {
        return (
          item?.teacher_name?.toLowerCase().includes(search.toLowerCase()) ||
          item?.leaveReason?.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return (
    <>
      <ToastContainer />
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
              <p className="profile-links">
                <Link to="/logout">Logout</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="py-6 subjects">
        <h1 className="text-2xl font-bold mb-4">Teacher Leave Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  #
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  Teacher
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  Reason
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  From
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  To
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  Status
                </th>
                <th className="px-2 py-1 border text-center text-md font-medium text-purple-800 bg-orange-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No leaves found.
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave._id} className="border-t">
                    <td className="px-2 py-1 border border-black text-sm font-[400]  text-center">
                      {index + 1}
                    </td>
                    <td className="px-2 py-1 border border-black text-sm font-[400] text-center">
                      {leave.teacher_name}
                    </td>
                    <td className="px-2 py-1 border border-black text-sm font-[400] text-left">
                      {leave.leaveReason}
                    </td>
                    <td className="px-2 py-1 border border-black text-sm font-[400] text-center">
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-1 border border-black text-sm font-[400] text-center">
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-1 rounded border border-black text-white text-md ">
                      <p
                        className={`px-2 py-1 text-white 
  ${
    leave.leaveStatus === "approved"
      ? "bg-green-500 text-white"
      : leave.leaveStatus === "rejected"
      ? "bg-red-500 text-white"
      : "bg-yellow-500 text-white"
  }`}
                      >
                        {leave.leaveStatus}
                      </p>
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          className="btn-approve bg-green-500 px-2 py-1 cursor-pointer hover:scale-105 hover:bg-green-600 text-white text-sm"
                          onClick={() => handleStatusUpdate(leave, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject bg-red-500 px-2 cursor-pointer hover:scale-105 hover:bg-red-600 text-white text-sm"
                          onClick={() => handleStatusUpdate(leave, "rejected")}
                        >
                          Reject
                        </button>
                        <button
                          className="btn-delete bg-red-900 px-2 cursor-pointer hover:scale-105 hover:bg-red-700 text-white text-sm"
                          onClick={() => handleDelete(leave._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Teacherleavepage;
