import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from "../../components/Sidebar";
import './teacher.scss'

const Teacher = () => {
  return (
    <>
       <div className="sidebar">
        <Sidebar />
      </div>

      <div className="All-content px-5">
        <Outlet />
      </div>
    </>
  )
}

export default Teacher
