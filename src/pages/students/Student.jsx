import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";

const Student = () => {
  

  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className=" All-content flex-1 p-5">
        
          <Outlet />
        </div>
    </>
  );
};

export default Student;
