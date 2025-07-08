// src/components/ClassCard.jsx
import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import "../styles/components/classcard.scss";
import { Scale } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const ClassCard = ({ classItem, handleDelete }) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white class-card shadow-lg hover:shadow-xl  rounded-sm p-4 w-full  transition-all"
      >
        <h2 className="text-xl font-semibold py-3 mb-2 flex justify-between">
          <div><strong>Class -</strong>{classItem.class_num}{classItem.class_num ===1 ? "st" : classItem.class_num ===2 ? "nd" : classItem.class_num ===3 ? "rd" : "th" }</div>
          <div><strong>Section - </strong> {classItem.class_text}</div>
        </h2>
        {/* <p className="text-sm text-gray-600">Sections: {classItem.sections}</p> */}
        <p className="text-sm text-gray-600 font-medium">
          {" "}
          <strong>Class Teacher : </strong>
          {classItem.attendee || "Not Assigned"}
        </p>
        <p className="text-sm pt-1 text-gray-600 font-medium">
          {" "}
          <strong> Subjects : </strong>
          {classItem.class_subjects}
        </p>
        <p className="text-sm pt-1 text-gray-600 font-medium">
          {" "}
          <strong>Total Students : </strong>
          {classItem.class_students}
        </p>
        <div className="teacher-btns mt-3">
          <Button className="py-1 edit  px-4 cursor-pointer">Edit</Button>
          <Button
            onClick={handleDelete}
            className="py-1 delete  px-4 cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default ClassCard;
