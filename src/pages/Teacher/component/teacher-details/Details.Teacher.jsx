import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useTeachers } from "../../../../CustomHooks/useTeachers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./detailsTeacher.scss"; // SCSS for structural overrides

const DetailsTeacher = () => {
  const { id } = useParams();
  const { teacher, loading, error, fetchSingleTeacher } = useTeachers();

  useEffect(() => {
    fetchSingleTeacher(id)
      .unwrap()
      .catch((err) => {
        toast.error("Failed to fetch teacher details");
        console.error(err);
      });
  }, [id, fetchSingleTeacher]);

  if (loading) return <div className="teacher-details">Loading...</div>;

  if (error) {
    toast.error(error);
    return <div className="teacher-details error">Error: {error}</div>;
  }

  if (!teacher) return <div className="teacher-details">No data found.</div>;

  return (
    <div className="teacher-detail px-4 py-6 min-h-screen bg-gray-50">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6 text-center">Teacher Details</h1>

      <motion.div
        className="teacher-detail__card flex flex-col md:flex-row bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <motion.img
            src={teacher.teacher_image}
            alt={teacher.teacher_name}
            className="rounded-xl w-64 h-64 object-cover shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          />
        </div>

        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-xl font-semibold mb-3">{teacher.teacher_name}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {teacher.email}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Qualification:</strong> {teacher.qualification}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Age:</strong> {teacher.age}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Gender:</strong> {teacher.gender}
          </p>
          <p className="text-gray-700">
            <strong>Joined On:</strong>{" "}
            {new Date(teacher.createdAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsTeacher;
