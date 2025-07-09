import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SubjectCard from "../../../../components/Subjectcard";
import Button from "../../../../components/Button";
import { useSubject } from "../../../../CustomHooks/useSubject";

import "../../../../styles/school/subjects/subjects.scss";

const Subjectpage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { subject, loading , error, fetch, remove : removeSubject  } = useSubject();

  const filteredSubject = Array.isArray(subject) ? subject : [].filter(
    (item) =>
      item.subject_name.toLowerCase().includes(search.toLowerCase()) ||
      item.add_teacher_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Loading subjects...");
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this subject?")) {
    try {
      const res = await removeSubject(id).unwrap();
      console.log("Delete response:", res);
      toast.dismiss();
      toast.success("Subject deleted successfully!");
      await fetch();  // Refresh list
    } catch (err) {
      console.error("Delete error:", err);
      toast.dismiss();
      toast.error(err.message || "Failed to delete subject");
    }
  }
};


  const handleEdit = (subject) => {
    // Redirect ya modal open logic yaha add kar sakte ho
    toast.info(`Edit requested for ${subject.subject_name}`);
  };

  return (
    <>
      <div className="navbar">
        <div className="search-box">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="search-icon cursor-pointer" />
          </motion.div>

          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Filter subjects by name and teacher name..."
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
            <motion.div
              className="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
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
            </motion.div>
          )}
        </div>
      </div>

      <div className="py-6 subjects">
        <div className="flex justify-between items-center mb-6">
          <h1 className="">Subjects</h1>
          <Button className="schedule-create-btn cursor-pointer">
            <Link to="/school/addsubject">Add New Subject</Link>
          </Button>
        </div>

        <div className="subject-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubject.map((item) => (
            <SubjectCard
              key={item._id}
              subject={item}
              onDelete={() => handleDelete(item._id)}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Subjectpage;



