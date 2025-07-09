import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../styles/school/student/addstudents.scss";
import { useStudent } from "../../../../CustomHooks/useStudent";
import { useClass } from "../../../../CustomHooks/useClass";

const AddStudents = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const { add, loading, error } = useStudent();

  const {
    classes,
    fetch: fetchClasses,
    loading: loadingClasses,
    error: errorClasses,
  } = useClass();

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    if (errorClasses) {
      toast.error(error);
    }
  }, [errorClasses]);

    const uniqueClasses = Array.from(
    new Map(classes.map((item) => [item.class_num , item])).values()
  );


  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const formData = new FormData();
      formData.append("student_name", data.student_name);
      formData.append("email", data.email);
      formData.append("student_password", data.student_password);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("guardian_name", data.guardian_name);
      formData.append("guardian_phone", data.guardian_phone);
      formData.append("status", data.status);
      formData.append("student_class", data.student_class);
      formData.append("student_image", data.student_image[0]);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      console.log("Form Data:", formData);

      await add(formData).unwrap();
      toast.success("Student added successfully!");
      reset();
    } catch (err) {
      toast.error(err || "Failed to add student");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 addstudent-form">
      <ToastContainer  autoClose={1000} position="top-right" />
      <motion.h1
        className="text-2xl font-bold text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Add Student
      </motion.h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Student Name */}
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            {...register("student_name", { required: "Name is required" })}
          />
          {errors.student_name && <p>{errors.student_name.message}</p>}
        </div>

        {/* Email */}
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Class */}
        {/* <div className="field">
          <label>Class</label>
          <input
            type="text"
            {...register("student_class", { required: "Class is required" })}
          />
          {errors.student_class && <p>{errors.student_class.message}</p>}
        </div> */}

         <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Class
          </label>
          <select
            {...register("student_class", { required: "Class is required" })}
            className="input w-full px-3 py-1 border rounded-sm" type="number"
          >
            <option value="">Select a class</option>
            {uniqueClasses.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.class_num}
              </option>
            ))}
          </select>
          {errors.student_class && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.student_class.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="field">
          <label>Age</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 3, message: "Minimum age is 3" },
            })}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div className="field">
          <label>Gender</label>
          <select {...register("gender", { required: "Gender is required" })}>
            <option value="">Select gender</option>
            {["Male", "Female", "Other"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        {/* Student Image */}
        <div className="field">
          <label>Student Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("student_image", { required: "Image is required" })}
          />
          {errors.student_image && <p>{errors.student_image.message}</p>}
        </div>

        {/* Guardian Name */}
        <div className="field">
          <label>Guardian Name</label>
          <input
            type="text"
            {...register("guardian_name", {
              required: "Guardian name is required",
            })}
          />
          {errors.guardian_name && <p>{errors.guardian_name.message}</p>}
        </div>

        {/* Guardian Phone */}
        <div className="field">
          <label>Guardian Phone</label>
          <input
            type="text"
            {...register("guardian_phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone must be 10 digits",
              },
            })}
          />
          {errors.guardian_phone && <p>{errors.guardian_phone.message}</p>}
        </div>

        {/* Password */}
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            {...register("student_password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.student_password && <p>{errors.student_password.message}</p>}
        </div>

        {/* Status */}
        <div className="field">
          <label>Status</label>
          <select {...register("status", { required: "Status is required" })}>
            <option value="">Select status</option>
            {["enrolled", "not-enrolled"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudents;
