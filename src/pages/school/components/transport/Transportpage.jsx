import React, { useState, useEffect } from "react";
import "../../../../styles/school/transport/transport.scss";
import transport_data from "../../../../assets/transport_data.json";
import TransportCard from "../../../../components/Transportcard";
import { Link, NavLink } from "react-router";
import {ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../../components/Button";

const Transportpage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtertransport = transport_data.filter((item) =>
    item.vehicle_number.toLowerCase().replace(/\s/g, "").includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <>
      <div className="pb-6">
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
              placeholder="Filter classes by name"
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


        <div className="flex justify-between items-center py-6">
        <h1>Transport</h1>
        <Button className="h-fit schedule-create-btn cursor-pointer"><Link to={"/addtransport"}> Add Transport</Link></Button>

        </div>


        <TransportCard transportData={filtertransport} />
      </div>
    </>
  );
};

export default Transportpage;
