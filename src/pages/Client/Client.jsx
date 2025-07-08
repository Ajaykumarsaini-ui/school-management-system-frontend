import React from "react";
import { Outlet } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { Bell, MessageCircle, ChevronDown, Search } from "lucide-react";
import "./client.scss";
import SearchInput from "../../common_components/Search_input.jsx";

const Client = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="client-content">
        <div className="navbar">
          {/* Left Side */}
          <div className="left-section ps-5">
            <h6>Welcome to our School Management System</h6>
          </div>

          {/* Right Side */}
          <div className="right-section pe-5">
            <nav className="w-[300px]">
              <ul className="nav-list flex justify-between items-center gap-4">
                <li>
                  <NavLink
                    to="/register"
                    className={`text-blue-600 hover:text-blue-800 font-medium transition duration-200`}
                  >
                    Register New School
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Client;
