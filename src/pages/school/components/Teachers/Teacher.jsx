import React, { useState, useEffect } from "react";
import "../../../../styles/school/teachers/teachers.scss";
import "../../../../styles/components/navbar.scss";
import Button from "../../../../components/Button.jsx";
import { Link, NavLink } from "react-router";
import { ChevronDown, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTeachers } from "../../../../CustomHooks/useTeachers.js";

const Teacher = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { teacher, loading, error, fetch, remove } = useTeachers();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (id) => {
    try {
      await remove(id).unwrap();
      toast.success("Teacher deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = Array.isArray(teacher)
    ? teacher.filter((t) =>
        t.teacher_name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) return <div>Loading teachers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="mb-6">
        {/* Navbar */}
        <div className="navbar">
          {/* Search Box */}
          <div className="search-box">
            <Search className="search-icon cursor-pointer" />
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Filter teachers by name"
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
              <div className="dropdown">
                <NavLink
                  className={({ isActive }) =>
                    `profile-links ${isActive ? "active" : ""}`
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `profile-links ${isActive ? "active" : ""}`
                  }
                  to="/logout"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="teachers-page pt-6">
          <ToastContainer autoClose={3000} />
          <div className="mb-6 flex justify-between items-center">
            <h1>Teachers</h1>
            <Button className="schedule-create-btn cursor-pointer">
              <Link to="/school/addteachers">Add New Teacher</Link>
            </Button>
          </div>

          <div className="teacher-card-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {filtered.length > 0 ? (
              filtered.map((teacher) => (
                <div
                  key={teacher._id}
                  className="teacher-card rounded-sm shadow-lg p-4 flex flex-col hover:shadow-xl transition duration-300"
                >
                  <div className="text-center flex items-center flex-col">
                    <img
                      src={teacher.teacher_image}
                      alt={teacher.teacher_name}
                      className="w-24 h-24 teacher-img cursor-pointer rounded-full mb-2 object-cover border-1"
                    />
                    <h2 className="text-md teacher-name mb-2 font-semibold">
                      {teacher.teacher_name}
                    </h2>
                  </div>

                  <p className="text-sm mb-1 teacher-phone font-medium text-gray-600 mt-1">
                    <strong>Qualification:</strong> {teacher.qualification}
                  </p>
                  <p className="text-sm teacher-mail font-medium text-gray-600">
                    <strong>Email:</strong> {teacher.email}
                  </p>
                  <p className="text-sm mb-1 font-medium teacher-perform text-green-800 mt-1">
                    <strong>Age:</strong> {teacher.age}
                  </p>
                  <p className="text-sm font-medium teacher-rating text-yellow-800">
                    <strong>Gender:</strong> {teacher.gender}
                  </p>

                  <div className="teacher-btns mt-2 flex gap-2">
                    <Button className="py-1 edit px-4 cursor-pointer">Edit</Button>
                    <Button
                      onClick={() => handleDelete(teacher._id)}
                      className="py-1 delete px-4 cursor-pointer"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center w-full text-gray-600">
                No Teacher Found
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
