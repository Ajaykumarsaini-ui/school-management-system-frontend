import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/components/sidebar.scss";
import { NavLink } from "react-router"; // ✅ Correct import
import { SIDEBAR_LINKS } from "../constants/Sidebarlinks";
import { getRoleFromToken } from "../auth/auth";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);
  const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const role = getRoleFromToken();

  const toggleDropdown = () => {
    setExamDropdownOpen(!examDropdownOpen);
  };

  const allLinks = SIDEBAR_LINKS[role] || [];

  const examLinks = allLinks.filter((link) =>
    link.label.toLowerCase().includes("exam")
  );
  const studentLinks = allLinks.filter((link) =>
    link.label.toLowerCase().includes("student")
  );

  const teacherLinks = allLinks.filter((link) =>
    link.label.toLowerCase().includes("teacher")
  );

  const otherLinks = allLinks.filter(
    (link) =>
      !link.label.toLowerCase().includes("exam") &&
      !link.label.toLowerCase().includes("student") &&
      !link.label.toLowerCase().includes("teacher")
  );

  return (
    <>
      {/* Sidebar Overlay */}
      <div className="inset-0 bg-opacity-30 z-40"></div>

      {/* Sidebar */}
      <motion.div className="sidebar overflow-y-auto">
        <div className="sidebar-header">
          <span>Dashboard</span>
        </div>

        <nav>
          {/* Render regular links */}
          {otherLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.label}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* teacher */}

          {teacherLinks.length > 0 && (
            <div className="sidebar-dropdown">
              <div
                className="sidebar-link cursor-pointer"
                onClick={() => setTeacherDropdownOpen(!teacherDropdownOpen)}
              >
                {teacherLinks[0].icon}
                <span>Teacher</span>
                {teacherDropdownOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              <AnimatePresence>
                {teacherDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="dropdown-menu"
                  >
                    {teacherLinks.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `sidebar-sublink flex gap-3 text-lg font-medium ${
                            isActive ? "active" : ""
                          }`
                        }
                      >
                        {item.icon}
                        {item.label.replace("Manage ", "")}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* student */}

          {studentLinks.length > 0 && (
            <div className="sidebar-dropdown">
              <div
                className="sidebar-link cursor-pointer"
                onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
              >
                {studentLinks[0].icon}
                <span>Students</span>
                {studentDropdownOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              <AnimatePresence>
                {studentDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="dropdown-menu"
                  >
                    {studentLinks.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `sidebar-sublink flex gap-3 text-lg font-medium ${
                            isActive ? "active" : ""
                          }`
                        }
                      >
                        {item.icon}
                        {item.label.replace("Manage ", "")}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Dropdown for exam-related links */}
          {examLinks.length > 0 && (
            <div className="sidebar-dropdown">
              <div
                className="sidebar-link cursor-pointer"
                onClick={toggleDropdown}
              >
                {examLinks[0].icon}
                <span>Exam</span>
                {examDropdownOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              <AnimatePresence>
                {examDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="dropdown-menu"
                  >
                    {examLinks.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `sidebar-sublink flex gap-3 text-lg font-medium ${
                            isActive ? "active" : ""
                          }`
                        }
                      >
                        {item.icon}
                        {item.label.replace("Manage ", "")}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>
      </motion.div>
    </>
  );
}
