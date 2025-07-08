import React from "react";
import Sidebar from "./components/Sidebar";
// import Approute from "./approutes/Approute";
import { Outlet } from "react-router";
import "./styles/layout.scss";
// import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="All-content px-5">
        {/* <Navbar /> */}
        <Outlet />
        {/* <Dashboard/> */}
      </div>
    </>
  );
};

export default Layout;
