import React from "react";
import { motion } from "framer-motion";
import "./logout.scss";
import { getRoleFromToken } from "../../../../auth/auth";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const role = getRoleFromToken();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/${role.toLowerCase()}`);
  };

  const handleConfirm = () => {
    localStorage.clear();

    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => navigate("/login"), 1000);
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
          <button onClick={handleConfirm} className="btn confirm">
            Logout
          </button>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default Logout;
