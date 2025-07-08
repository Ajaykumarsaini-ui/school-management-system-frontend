import React from "react";
import "../styles/components/subjectcard.scss";
import Button from "./Button";

const SubjectCard = ({ subject, onDelete, onEdit }) => {
  return (
    <div className="subject-card bg-white rounded-sm shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out">
      <h2 className="text-xl font-semibold mb-3 capitalize">{subject.subject_name}</h2>
      
      <p className="text-sm pt-1">
        <strong>Code:</strong> {subject.subject_code}
      </p>
      
      <p className="text-sm pt-1">
        <strong>Class:</strong> {subject.add_class_name}{subject.add_class_name == 1 ? "st" : subject.add_class_name == 2 ? "nd" : subject.add_class_name ==3 ? "rd":"th" }
      </p>
      
      {/* <p className="text-sm pt-1">
        <strong>Teacher:</strong> {subject.add_teacher_name}
      </p> */}
      
      <p className="text-sm pb-2 pt-1">
        <strong>Type:</strong> {subject.subjectType}
      </p>

      <div className="my-3 text-center">
        <a
          href={subject.syllabusFile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 underline"
        >
          View Syllabus
        </a>
      </div>

      <div className="teacher-btns flex justify-between">
        <Button
          className="py-1 edit px-4 cursor-pointer"
          onClick={() => onEdit(subject)}
        >
          Edit
        </Button>
        <Button
          className="py-1 delete px-4 cursor-pointer"
          onClick={() => onDelete(subject._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
