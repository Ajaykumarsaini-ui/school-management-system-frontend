import React, { useState, useEffect } from "react";
import "../../../../styles/school/student/students.scss";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import Button from "../../../../components/Button";
import { useStudent } from "../../../../CustomHooks/useStudent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink } from "react-router"; // fixed import
import Pagination from "../../../../components/Pagination"; 
import { useAttendence } from "../../../../CustomHooks/useAttendence";

const Students = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const {
    students,
    loading,
    error,
    fetch,
    page,
    totalPages,
    changePage,
    remove,
  } = useStudent();

  // Fetch students with pagination
  useEffect(() => {
    fetch(page, 100);
  }, [page]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      remove(id)
        .then(() => fetch())
        .then(() => toast.success("Student deleted successfully"));
    }
  };

  // Filter based on search
  const filteredStudents = students.filter((student) =>
    student.student_name.toLowerCase().includes(search.toLowerCase())
  );

  // Search input handler
  const handleChange = (e) => setSearch(e.target.value);

  if (loading) return <div className="p-4">Loading students...</div>;

  if (error) {
    toast.error(error);
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="navbar">
        {/* Search Bar */}
        <div className="search-box">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search className="search-icon cursor-pointer" />
          </motion.div>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Filter students by name"
          />
        </div>

        {/* Right Section */}
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
            <motion.div
              className="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <NavLink className="profile-links" to="/profile">
                Profile
              </NavLink>
              <NavLink className="profile-links" to="/logout">
                Logout
              </NavLink>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div className="students-container pt-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Students</h1>
          <Button className="schedule-create-btn cursor-pointer">
            <Link to="/school/addstudents">Add New Student</Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Class</th>
                <th className="py-3 px-4 border-b">Age</th>
                <th className="py-3 px-4 border-b">Gender</th>
                <th className="py-3 px-4 border-b">Guardian</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Image</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Action</th>
                <th className="py-3 px-4 border-b">Attendence status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="py-2 px-4 border-b">{student.student_name}</td>
                  <td className="py-2 px-4 border-b">
                    {student.student_class}
                  </td>
                  <td className="py-2 px-4 border-b">{student.age}</td>
                  <td className="py-2 px-4 border-b">{student.gender}</td>
                  <td className="py-2 px-4 border-b">
                    {student.guardian_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.guardian_phone}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={student.student_image}
                      className="w-10 h-10 object-cover rounded-full"
                      alt={student.student_name}
                    />
                  </td>
                  <td
                    className={`py-2 px-4 border-b font-semibold ${
                      student.status === "enrolled"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {student.status}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/school/students/${student._id}`}
                      className="text-blue-600 pe-1 hover:text-blue-800"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="ml-2 cursor-pointer text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="ml-2 cursor-pointer text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.attendence_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component or Inline */}
        <div className="flex justify-center mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => changePage(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Students;
