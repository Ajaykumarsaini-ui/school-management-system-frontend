import React from "react";
import { motion } from "framer-motion";
import "./logout.scss";
import { getRoleFromToken } from "../../../../auth/auth";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../apiservice/AxiosInstance";
import axios from "axios";

const Logout = () => {
  const role = getRoleFromToken();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/${role.toLowerCase()}`);
  };

  const handleLogout = async () => {
  try {
    await axiosInstance.post("/auth/logout"); // ✅ No need to pass withCredentials again
    localStorage.clear();
    toast.success("Logout successful");

    // ⏳ Redirect after short delay
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    toast.error("Logout failed");
    console.error("Logout error:", error);
  }
};


  return (
    <div className="logout-backdrop">
      <motion.div
        className="logout-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2>Are you sure you want to logout?</h2>
        <div className="logout-actions">
          <button onClick={handleCancel} className="btn cancel">
            Cancel
          </button>
          <button onClick={handleLogout} className="btn confirm">
            Logout
          </button>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default Logout;
