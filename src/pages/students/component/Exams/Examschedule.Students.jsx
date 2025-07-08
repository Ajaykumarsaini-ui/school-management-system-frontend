import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../../../styles/school/exams/examschedule.scss";
import Button from "../../../../components/Button";
import { useSchedule } from "../../../../CustomHooks/useSchedule";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bell, MessageCircle, ChevronDown, Search } from "lucide-react";
import { Link, NavLink } from "react-router";

const ExamscheduleStudents = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { schedule, loading, error, fetch } = useSchedule();

const filteredexams = Array.isArray(schedule?.data)
  ? schedule.data.filter((exam) =>
      (exam.exam_date || "").toLowerCase().includes(search.toLowerCase())
    )
  : [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
  const fetchSchedule = async () => {
    try {
      await fetch().unwrap();
      
      // toast.success("Schedule fetched successfully!");
    } catch (err) {
      console.error("Fetch failed", err);
      toast.error("Failed to fetch schedule");
    }
  };
  fetchSchedule();
}, [fetch]);

useEffect(() => {
console.log(schedule);
console.log(filteredexams);


}, [schedule , filteredexams]);

// Remove loading + error extra toast code

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
            placeholder="Search exam date"
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

          <AnimatePresence>
            {open && (
              <motion.div
                className="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
          </AnimatePresence>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-6">
        <h1 className="font-medium text-center">📚 Exam Schedule</h1>

        {/* <Button className="schedule-create-btn cursor-pointer">
          <Link to={"/school/createexamschedule"}>Create Exam Schedule</Link>
        </Button> */}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredexams.length === 0 ? (
            <p>No exam schedules found.</p>
          ) : (
            filteredexams.map((exam, index) => (
              <motion.div
                key={exam._id}
                className="exam-card shadow-sm rounded-sm p-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <h2>{exam.subject}</h2>
                  <p>
                    {exam.class_name}th ( {exam.section} )
                  </p>
                </div>

                <p className="mb-1">
                  <strong>Date: </strong> {exam.exam_date}
                </p>
                <p className="mb-1">
                  <strong>Time: </strong> {exam.start_time} - {exam.end_time}
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ExamscheduleStudents;
