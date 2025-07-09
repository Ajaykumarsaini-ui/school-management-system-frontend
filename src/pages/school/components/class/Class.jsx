import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Search, ChevronDown } from "lucide-react";
import { NavLink, Link } from "react-router";
import "../../../../styles/school/class/classes.scss";
import Button from "../../../../components/Button";
import ClassCard from "../../../../components/Classcard";
import { useClass } from "../../../../CustomHooks/useClass";
import "react-toastify/dist/ReactToastify.css";

const ClassPage = () => {
  const { classes, loading, error, fetch, remove } = useClass();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch classes on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  const handledelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      await remove(id);
      toast.success("Class deleted successfully");
      fetch();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete class. Please try again.");
    }
  };

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  // Handle loading toast
  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Loading classes...");
    } else {
      toast.dismiss();
    }
  }, [loading]);

  // Filter logic — safe and robust
  const filterClass = Array.isArray(classes)
    ? classes.filter((item) =>
        (item?.class_name || "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="navbar">
        {/* Search Bar */}
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter classes by name"
          />
        </div>

        {/* Profile */}
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

      <div className="pt-6 pb-6 class-page">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-3xl text-center font-medium">Classes</h1>
          <Button className="schedule-create-btn cursor-pointer">
            <Link to={"/school/addclass"}>Add New Class</Link>
          </Button>
        </div>

        <div className="class-cards">
          {filterClass.length > 0 ? (
            filterClass.map((cls) => (
              <ClassCard
                key={cls._id}
                handleDelete={() => handledelete(cls._id)}
                classItem={cls}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No classes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassPage;
