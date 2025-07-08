import React, { useEffect } from "react";
import { useAttendence } from "../../../../CustomHooks/useAttendence";
import "./attendence.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendenceStudents = () => {
  const { attendence, loading, error, fetch } = useAttendence();

  useEffect(() => {
    fetch(); // Fetch attendance data on mount
  }, [fetch]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ToastContainer autoClose={1500} position="top-right" />

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">My Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">
          Check your daily attendance status
        </p>
      </div>

      {/* 🔄 Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      ) : attendence.length === 0 ? (
        <div className="text-center text-gray-400">
          No attendance data found.
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {attendence.map((record) => (
            <div
              key={record._id}
              className={`attendance-card border rounded-lg p-4 shadow-md flex justify-between items-center transition-all duration-200 ${
                record.present
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {new Date(record.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Class: {record.studentClass?.class_num || "N/A"} | Class
                  Teacher: {record.teacher_name || "Unknown"}
                </p>
              </div>

              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  record.present
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {record.present ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendenceStudents;
