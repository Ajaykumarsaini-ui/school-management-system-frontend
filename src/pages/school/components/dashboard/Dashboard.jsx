import React, { useState, useEffect } from "react";
import "../../../../styles/school/dashboard/dashboard.scss";
import { motion } from "framer-motion";

import { GraduationCap, User, Medal, Users } from "lucide-react";
import Navbar from "../../../../components/Navbar";
import { useStudent } from "../../../../CustomHooks/useStudent";
import { useTeachers } from "../../../../CustomHooks/useTeachers";

const Dashboard = () => {
  const [data, setData] = useState(1500);

  const { students , fetch } = useStudent();
  const { teacher , fetch: fetchTeacher } = useTeachers();

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    fetchTeacher();
  }, [fetchTeacher]);

  const stats = [
    {
      label: "Students",
      count: students.length,
      icon: <GraduationCap size={32} color="#8e44ad" />,
      bg: "bg-purple-100",
    },
    {
      label: "Teachers",
      count: teacher.length,
      icon: <User size={32} color="#2980b9" />,
      bg: "bg-blue-100",
    },
    {
      label: "Awards",
      count: "5.6K",
      icon: <Medal size={32} color="#e67e22" />,
      bg: "bg-orange-100",
    },
    {
      label: "Other staff",
      count: "300",
      icon: <Users size={32} color="purple" />,
      bg: "bg-cyan-100",
    },
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="welcome py-4">
          <h1 className="text-2xl">Welcome</h1>
          <p className=" font-light">
            Navigate the future of education with us.
          </p>
        </div>

        <div className="stats-container flex justify-between">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className={`card flex justify-between items-center p-5 rounded-xl shadow-sm ${item.bg}`}
            >
              <div>
                <p className="label">{item.label}</p>
                <h2 className="count">
                  {item.count}
                </h2>
              </div>
              <div className="icon">{item.icon}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
