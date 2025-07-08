import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../../styles/school/class/addclass.scss";
import { useClass } from "../../../../CustomHooks/useClass";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTeachers } from "../../../../CustomHooks/useTeachers";
import Button from "../../../../components/Button";

const Addclass = () => {
  const { add } = useClass();

  const { fetch, teacher } = useTeachers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      class_students: "",
      class_subjects: "",
      class_text: "",
      class_num: "",
      attendee: "",
    },
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onSubmit = async (formData) => {
    try {
      await add(formData)
        .unwrap()
        .then(() => {
          toast.success("Class added successfully!");
          console.log("Class submitted:", formData);
          reset();
        });
    } catch (err) {
      console.error("Error submitting class:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="addclass-container bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10">
      <ToastContainer autoClose={3000} position="top-right" />
      <h1 className="text-2xl font-bold mb-4 text-center">Add Class</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* class students */}
        <div>
          <label className="block text-gray-700 mb-1">Class (Students)</label>
          <input
            type="number"
            {...register("class_students", {
              required: "Class students is required",
            })}
            className="w-full border px-3 py-1 rounded focus:outline-none"
            placeholder="Enter class students...."
          />
          {errors.class_students && (
            <p className="text-red-500 text-sm">
              {errors.class_students.message}
            </p>
          )}
        </div>

        {/* class_subjects */}
        <div>
          <label className="block text-gray-700 mb-1">Class subjects</label>
          <input
            type="text"
            {...register("class_subjects", {
              required: "class subjects is required",
            })}
            className="w-full border px-3 py-1 rounded focus:outline-none"
            placeholder="Enter class subjects name"
          />
          {errors.class_subjects && (
            <p className="text-red-500 text-sm">
              {errors.class_subjects.message}
            </p>
          )}
        </div>

        {/* Class Text */}
        <div>
          <label className="block text-gray-700 mb-1">Class (Section)</label>
          <select name="" className="w-full border px-3 py-1 rounded focus:outline-none" {...register("class_text" , {required: "Class text is required"}) } id="">
            <option value="">Select secton</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
          </select>
          {/* <input
            type="text"
            {...register("class_text", { required: "Class text is required" })}
            className="w-full border px-3 py-1 rounded focus:outline-none"
            placeholder="e.g. First"
          /> */}
          {errors.class_text && (
            <p className="text-red-500 text-sm">{errors.class_text.message}</p>
          )}
        </div>

        {/* Class Number */}
        <div>
          <label className="block text-gray-700 mb-1">Class (Number)</label>
          <input
            type="text"
            {...register("class_num", { required: "Class number is required" })}
            className="w-full border px-3 py-2 rounded focus:outline-none"
            placeholder="e.g. 1"
          />
          {errors.class_num && (
            <p className="text-red-500 text-sm">{errors.class_num.message}</p>
          )}
        </div>

        {/* Attendee */}
        <div>
          <label className="block text-gray-700 mb-1">Attendee (Teacher)</label>
          <select
            {...register("attendee", { required: "Attendee is required" })}
            className="w-full border px-3 py-1 rounded focus:outline-none"
          >
            <option value="">Select Teacher</option>
            {teacher.map((teacher) => (
              <option
                className="text-black "
                key={teacher._id}
                value={teacher.teacher_name}
              >
                {teacher.teacher_name}
              </option>
            ))}
          </select>
          {errors.attendee && (
            <p className="text-red-500 text-sm">{errors.attendee.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center mt-6 mb-6">
          <Button type="submit" className="schedule-create-btn cursor-pointer">
            {isSubmitting ? "Submitting..." : "Submit Class Details"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Addclass;
