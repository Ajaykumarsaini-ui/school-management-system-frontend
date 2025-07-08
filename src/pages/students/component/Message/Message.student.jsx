import React, { useEffect, useState } from "react";
import { useStudentmessage } from "../../../../CustomHooks/useStudentmessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./message.scss";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { Bell, MessageCircle, ChevronDown, Search } from "lucide-react";
import Button from "../../../../components/Button";
import { useLocation } from "react-router";


const Messagestudent = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();


  const id = localStorage.getItem("userId");


  const { studentmessage, loading, error, fetchstudentmessage } =
    useStudentmessage();

 useEffect(() => {
  fetchstudentmessage(id).unwrap();

  if (location.state?.newMessageAdded) {
    toast.success("Message added successfully!");
    window.history.replaceState({}, document.title); // clear state
  }
}, [location.state]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Loading messages...");
    }
  }, [loading]);

  const filteredMessages = studentmessage
    ? studentmessage.filter((message) =>
        message.message.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto px-4">
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
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}

      <div className="flex justify-between py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Your Messages
        </h1>

        <Link to="/student/addmessage">
          <Button className="bg-purple-600 py-1 px-1 cursor-pointer hover:bg-purple-300 hover:text-black">
            Send Messages
          </Button>
        </Link>
      </div>

      {studentmessage?.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {filteredMessages?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-600 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-gray-800 text-base">{item.message}</p>
              </div>

              {item.attachment && (
                <div className="mt-4 md:mt-0 md:ml-6">
                  <img
                    className="w-40 h-auto rounded-md border"
                    src={item.attachment}
                    alt="attachment"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messagestudent;
