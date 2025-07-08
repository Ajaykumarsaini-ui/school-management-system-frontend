import React from "react";
import Noticecard from "../../../../components/Noticecard";
import notice from "../../../../assets/notice_data.json";
import "../../../../styles/school/notices/notices.scss";

import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { ChevronDown, Search } from "lucide-react";
import "../../../../styles/components/navbar.scss";
import { useState, useEffect } from "react";
import Button from "../../../../components/Button";
import { useNotice } from "../../../../CustomHooks/useNotice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NoticesStudents = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { notice, loading, error, fetch } = useNotice();

useEffect(() => {
  fetch();
}, [fetch]);

useEffect(() => {
  if (loading) {
    toast.dismiss();
    toast.info("Loading notices...");
  }
}, [loading]);

useEffect(() => {
  if (error) {
    toast.dismiss();
    toast.error(error);
  }
}, [error]);


  // const filteredNotices = Array.isArray(notice)
  //   ? notice
  //   : [].filter((notice) =>
  //       notice.title.toLowerCase().includes(search.toLowerCase())
  //     );

  const filteredNotices = notice?notice.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
) : [];


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
              placeholder="search notices by title"
            ></input>
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

        <div className="notices pb-6">
          <div className="my-6">
            <h1 className="text-3xl text-center font-medium">Notices</h1>
            {/* <Button className="schedule-create-btn cursor-pointer">
              <Link to={"/school/addnotice"}>Add New Notices</Link>
            </Button> */}
          </div>

          <Noticecard noticedata={filteredNotices} />
        </div>
      </div>
    </>
  );
};

export default NoticesStudents;
