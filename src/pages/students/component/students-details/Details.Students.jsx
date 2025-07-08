import React, { useEffect } from "react";
import { useStudent } from "../../../../CustomHooks/useStudent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import './studentdetail.scss'


const DetailsStudents = () => {
  const { student, fetchSingleStudent } = useStudent();

  useEffect(() => {
    fetchSingleStudent();
  }, [fetchSingleStudent]);

  useEffect(() => {
    if (student) {
      console.log("Student data:", student);
    }
  }, [student]);

  // Array of fields to display
  const studentInfo = [
    { label: "Email", value: student?.email },
    { label: "Class", value: student?.student_class },
    { label: "Age", value: student?.age },
    { label: "Gender", value: student?.gender },
  ];

  return (
    <div>
      <h1>Students Details</h1>
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div
        className="bg-white shadow rounded-2xl p-6 mb-6 student-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {student?.student_name || "Student"}
        </h2>

        <div className="student-info-container">
          <div className="info-content">
            {studentInfo.map(
              (info) =>
                info.value && (
                  <p className="text-gray-700mb-2" key={info.label}>
                    <span className="font-semibold">{info.label}:</span>{" "}
                    {info.value}
                  </p>
                )
            )}
          </div>

          {student?.student_image && (
            <motion.div
              className="info-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={student.student_image}
                alt="Student"
                className="w-full h-auto object-cover border"
              />
            </motion.div>
          )}
        </div>
      </motion.div>

     
    </div>
  );
};

export default DetailsStudents;
