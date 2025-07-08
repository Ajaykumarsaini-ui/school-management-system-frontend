import React, { useEffect } from "react";
import "./subject.scss";
import { useStudent } from "../../../../CustomHooks/useStudent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subjectsstudent = () => {
  const { loading, error, studentSubject, fetchSubjects } = useStudent();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!studentSubject?.data?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No subjects found</p>
      </div>
    );
  }

  return (
    <div className="subjects-container">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Subjects</h1>

        <div className="subjects-grid">
          {studentSubject.data.map((subject) => (
            <div key={subject._id} className="subject-card">
              <div className="subject-card__header">
                <h3 className="subject-card__title">{subject.subject_name}</h3>
                <span className={`subject-card__tag ${
                  subject.subjectType === "Core" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                }`}>
                  {subject.subjectType}
                </span>
              </div>
              
              <div className="subject-card__body">
                <div className="subject-info">
                  <span className="subject-info__label">Teacher:</span>
                  <span className="subject-info__value">{subject.add_teacher_name}</span>
                </div>
                
                <div className="subject-info">
                  <span className="subject-info__label">Code:</span>
                  <span className="subject-info__value">{subject.subject_code}</span>
                </div>
                
                <div className="subject-info">
                  <span className="subject-info__label">Class:</span>
                  <span className="subject-info__value">{subject.add_class_name}</span>
                </div>
              </div>
              
              {subject.syllabusFile && (
                <a 
                  href={subject.syllabusFile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="subject-card__link"
                >
                  Download Syllabus
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjectsstudent;