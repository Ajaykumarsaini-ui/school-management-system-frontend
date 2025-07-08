import { useState } from "react";
import "./styles/home.scss";
import Sidebar from "./components/Sidebar";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Layout from "./Layout";
import Approute from "./approutes/Approute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Approute />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
