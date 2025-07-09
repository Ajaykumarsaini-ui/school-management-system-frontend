import React from "react";
import "../../../../styles/school/hostle/hostle.scss";
import hostle_data from "../../../../assets/hostle_data.json";
import { motion } from "framer-motion";
import Button from "../../../../components/Button";

import "../../../../styles/components/navbar.scss";
import { Link, NavLink } from "react-router";
import {  ChevronDown, Search } from "lucide-react";
import { useState , useEffect } from "react";


const Hostlepage = () => {

    const [search, setSearch] = useState("");
      const [open, setOpen] = useState(false);
    

    const filteredHostle = hostle_data.filter((hostle) =>
      hostle.hostel_name.toLowerCase().includes(search.toLowerCase())
    );
  
  
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
  
    useEffect(() => {
      console.log(search);
    }, [search]);
  
  






  return (
    <>
      <div>
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
              onChange={handleChange}
              placeholder="Filter hostles by name"
            />
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

        <div className="hostle-page">
          <div className="mb-6 items-center flex justify-between">
            <h1 className=" text-center">Hostel Information</h1>
            <Button className="schedule-create-btn cursor-pointer">
              <Link to="/addhostle">Create Hostel</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHostle.map((hostel) => (
              <motion.div
                key={hostel.id}
                className="hostle-card rounded-sm shadow-sm overflow-hidden bg-white transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={hostel.hostel_photo}
                  alt={hostel.hostel_name}
                  className="w-full h-[290px] object-cover"
                />
                <div className="px-4 pb-5 space-y-2">
                  <h2 className="text-xl font-semibold">
                    {hostel.hostel_name}
                  </h2>
                  <p>
                    <span className="font-medium">Warden : </span>{" "}
                    {hostel.warden_name}
                  </p>
                  <p>
                    <span className="font-medium">Location : </span>{" "}
                    {hostel.location}
                  </p>
                  <p>
                    <span className="font-medium">Contact : </span>{" "}
                    {hostel.contact}
                  </p>
                  <p>
                    <span className="font-medium">Total Rooms : </span>{" "}
                    {hostel.total_rooms}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hostlepage;
