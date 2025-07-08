import React, { useEffect, useState } from "react";
import "./attendence.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAttendence } from "../../../../CustomHooks/useAttendence";
import { useClass } from "../../../../CustomHooks/useClass";
import Button from "../../../../components/Button";
import { Link } from "react-router";

const AttendanceTeacher = () => {
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState("");
  const { fetchbydate, loading, error, attendence } = useAttendence();

  const {
    classes,
    loading: classLoading,
    error: classError,
    fetch: fetchClasses,
  } = useClass();

  useEffect(() => {
    console.log(attendence);
  }, [attendence]);

  useEffect(() => {
    fetchClasses().unwrap();
  }, [fetchClasses]);

  useEffect(() => {
    if (classError) toast.error(`Class Error: ${classError}`);
  }, [classError]);

  const uniqueClasses = Array.from(
    new Map(classes.map((item) => [item.class_num, item])).values()
  );

  const handleFetch = () => {
    if (!classId || !date) {
      toast.warn("Please select both class and date");
      return;
    }
    const rawDate = new Date(date);
    const formattedDate = new Date(rawDate.setHours(0, 0, 0, 0)); // ← this is the fix

    fetchbydate({ classId, date: formattedDate }).unwrap();
  };

  return (
    <div className="px-4 attendence-viewer py-6 min-h-screen bg-gray-50">
      <ToastContainer autoClose={1500} position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-indigo-700">Attendance Viewer</h1>
        <Button className="schedule-create-btn cursor-pointer">
          <Link to="/teacher/addattendence">+ Add Attendance</Link>
        </Button>
      </div>

      <div className="bg-white p-5 pb-8 rounded shadow mb-6 flex gap-4 flex-col items-center">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <label className="text-md mb-2">Select Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="border text-gray-400 px-3 py-1 rounded w-48"
            >
              <option value="">-- Select Class --</option>
              {uniqueClasses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.class_num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-md mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border text-gray-400 px-3 py-1 rounded w-48"
            />
          </div>
        </div>

        <button
          onClick={handleFetch}
          className="bg-purple-200 text-black cursor-pointer hover:bg-purple-800 hover:text-white px-4 py-1 rounded mt-4 md:mt-6"
        >
          Get Attendance
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading attendance...</div>
      ) : attendence.length === 0 ? (
        <div className="text-center text-gray-400">
          No attendance records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded shadow">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Student</th>
                <th className="px-4 py-2 text-left">Guardian</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendence?.records.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.student?.student_name}</td>
                  <td className="px-4 py-2">{item.student?.guardian_name}</td>
                  <td className="px-4 py-2">{item.student?.guardian_phone}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      item.present ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.present ? "Present" : "Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 gap-10 dailyAttendencesummary">
            <p>
              <strong>Absent : </strong> {attendence.absent}
            </p>
            <p>
              <strong>Present : </strong> {attendence.present}
            </p>
            <p>
              <strong>Total : </strong> {attendence.total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTeacher;
