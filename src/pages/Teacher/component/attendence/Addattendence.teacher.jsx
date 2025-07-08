import React, { useEffect, useState } from "react";
import "./addattendence.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTeachers } from "../../../../CustomHooks/useTeachers";
import { useAttendence } from "../../../../CustomHooks/useAttendence";
const Addattendenceteacher = () => {
  const { classandstudent, fetchClassandstudent, loading, error } =
    useTeachers();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null); // storing class _id
  const [attendance, setAttendance] = useState({});

  const Showablestudents = classandstudent?.Assignedstudents?.filter(
    (item) => item.student_class == selectedClass
  );

  const {
    add: addAttendence,
    loading: attendenceLoading,
    error: attendenceError,
  } = useAttendence();

  const handleCheckboxChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  useEffect(() => {
    if (attendenceError) {
      toast.error("Failed to submit attendance");
    }
  }, [attendenceError]);

  const handleSubmit = async () => {
    if (!selectedClassId) {
      toast.error("Please select a class first.");
      return;
    }

    const studentArray = Showablestudents.map((student) => ({
      studentId: student._id,
      present: !!attendance[student._id],
      teacher_name: classandstudent?.Teacherassignedclass?.[0]?.attendee,
    }));

    try {
      await addAttendence({
        date: new Date().toISOString(),
        classId: selectedClassId,
        students: studentArray,
      }).unwrap();

      toast.success("Attendance submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit attendance");
    }
  };

  const handleClassChange = (e) => {
    const classNum = e.target.value;
    setSelectedClass(classNum);
    const found = classandstudent?.Teacherassignedclass?.find(
      (c) => c.class_num == classNum
    );
    setSelectedClassId(found?._id || null); // important: classId needed for backend
  };

  useEffect(() => {
    fetchClassandstudent();
  }, [fetchClassandstudent]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen text-gray-800">
      <ToastContainer autoClose={1000} position="top-right" />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Attendance</h1>
      </div>

      {/* Select Class */}
      <div className="attendence-assigned-class mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-600 text-center">
          Select Assigned Class
        </h2>
        <div className="flex justify-center">
          <select
            onChange={handleClassChange}
            className="form-select border border-indigo-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Class --</option>
            {classandstudent?.Teacherassignedclass?.map((item) => (
              <option value={item.class_num} key={item._id}>
                {item.class_num}
                {item.class_num == "1"
                  ? "st"
                  : item.class_num == "2"
                  ? "nd"
                  : item.class_num == "3"
                  ? "rd"
                  : "th"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student List */}
      <div className="attendence-assigned-students">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Assigned Students
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading students...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error fetching students.</p>
        ) : Showablestudents?.length === 0 ? (
          <p className="text-center text-gray-400">
            No students found for this class.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-center">Name</th>
                  <th className="py-2 px-4 text-center">Guardian</th>
                  <th className="py-2 px-4 text-center">Contact</th>
                  <th className="py-2 px-4 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {Showablestudents?.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="py-2 px-4 text-sm text-center capitalize">
                      {student.student_name}
                    </td>
                    <td className="py-2 px-4 text-sm capitalize text-center">
                      Mr. {student.guardian_name}
                    </td>
                    <td className="py-2 px-4 text-sm text-center">
                      {student.guardian_phone}
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={!!attendance[student._id]}
                        onChange={() => handleCheckboxChange(student._id)}
                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addattendenceteacher;

