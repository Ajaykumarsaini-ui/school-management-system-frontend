import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { Bell, MessageCircle, ChevronDown, Search } from "lucide-react";
import "../styles/components/navbar.scss";
import SearchInput from "../common_components/Search_input";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      {/* Search Bar */}
      <div className="search-box">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>

        <Search className="search-icon cursor-pointer" />
        </motion.div>
        <SearchInput  placeholder="search anything here"></SearchInput>
        {/* <input type="text" placeholder="Search anything here" /> */}
      </div>

      {/* Right Side */}
      <div className="right-section">
        {/* <Bell className="icon" /> */}
        {/* <MessageCircle className="icon" /> */}

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

        {/* Dropdown */}
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
            <NavLink className={({ isActive }) =>
                `profile-links ${isActive ? "active" : ""}`
              } to="/logout">
              Logout
            </NavLink>
          </motion.div>
        )}
      </div>
    </div>
  );
}
