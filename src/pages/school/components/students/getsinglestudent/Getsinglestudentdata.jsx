import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import "./singlestudent.scss";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../../../components/Button";
import { useStudent } from "../../../../../CustomHooks/useStudent";
import { useAttendence } from "../../../../../CustomHooks/useAttendence";

const Getsinglestudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    attendence,
    deleteattendence,
    studentattendencestatus,
    loading: attendenceLoading,
    error: attendenceError,
  } = useAttendence();

  useEffect(() => {
    studentattendencestatus(id);
  }, [studentattendencestatus, id]);

  useEffect(() => {
    if (attendenceError) toast.error(attendenceError);
  }, [attendenceError]);

  useEffect(() => {
    console.log(attendence);
  }, [attendence]);

  const {
    student: singleStudent,
    fetchSingleStudentbyId,
    remove,
    loading,
    error,
  } = useStudent();

  useEffect(() => {
    fetchSingleStudentbyId(id);
  }, [fetchSingleStudentbyId, id]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      remove(id)
        .then(() => {
          toast.success("Student deleted successfully");
          setTimeout(() => navigate("/school/students"), 1500);
        })
        .catch(() => {
          toast.error("Failed to delete student");
        });
    }
  };

  if (loading) return <div className="studentpage">Loading student...</div>;

  if (error) return <div className="studentpage error">Error: {error}</div>;

  if (!singleStudent)
    return <div className="studentpage">No student found with this ID.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="studentpage"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="studentpage__header">
        <h1>Student Details</h1>
      </div>

      <div className="studentpage__content">
        <div className="studentpage__content--details">
          <div
            key={singleStudent._id}
            className="flex  justify-between gap-3 items-center"
          >
            <div className="studentpage__image">
              {singleStudent.student_image && (
                <img
                  src={singleStudent.student_image}
                  alt={singleStudent.student_name}
                  className="studentpage__content--details--image"
                />
              )}
            </div>
            <div className="studentpage__contentinner">
              <h2 className="text-xl font-semibold">
                {singleStudent.student_name}
              </h2>
              <p>
                <strong>Email:</strong> {singleStudent.email}
              </p>
              <p>
                <strong>Class:</strong> {singleStudent.student_class}
              </p>
              <p>
                <strong>Age:</strong>
                {singleStudent.age}
              </p>
              <p>
                <strong>Gender:</strong> {singleStudent.gender}
              </p>
              <p>
                <strong>Guardian:</strong> {singleStudent.guardian_name}
              </p>
              <p>
                <strong>Phone: </strong> {singleStudent.guardian_phone}
              </p>
              <p>
                <strong>Status:</strong>

                <span
                  className={
                    singleStudent.status === "enrolled"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {" " + singleStudent.status}
                </span>
              </p>

              <p>
                <strong>Present: </strong> {attendence.present}
              </p>
              <p>
                <strong>Absent: </strong> {attendence.absent}
              </p>
              <p>
                <strong>Percentage : </strong> {attendence.percentage}%
              </p>
              <p>
                <strong>Total : </strong> {attendence.total}
              </p>

              <div className="studentpage__content--actions mt-4 flex gap-3">
                <Link to={`/school/students/${id}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Getsinglestudent;
