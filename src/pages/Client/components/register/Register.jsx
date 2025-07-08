import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerschool } from "../../../../features/school/schoolThunk";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SchoolRegisterForm.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { loading, error, school } = useSelector((state) => state.school);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("school_name", data.school_name);
    formData.append("email", data.email);
    formData.append("owner_name", data.owner_name);
    formData.append("school_image", data.school_image[0]);
    formData.append("password", data.password);

    dispatch(registerschool(formData));
  };

  useEffect(() => {
    if (school && !loading) {
      toast.success("School registered successfully!");
      reset();
      navigate("/login");
    }

    if (error && typeof error === "string") {
      toast.error(error);
    }
  }, [school, error, loading, navigate, reset]);

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Register School
        </h2>

        {/* First Row: School Name and Email */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label htmlFor="school_name" className="block mb-1 font-medium text-gray-700">
              School Name
            </label>
            <input
              type="text"
              id="school_name"
              {...register("school_name", { required: "School name is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.school_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.school_name && <p className="text-red-500 text-sm mt-1">{errors.school_name.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Second Row: Owner Name and School Image */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label htmlFor="owner_name" className="block mb-1 font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              id="owner_name"
              {...register("owner_name", { required: "Owner name is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.owner_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.owner_name && <p className="text-red-500 text-sm mt-1">{errors.owner_name.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="school_image" className="block mb-1 font-medium text-gray-700">
              School Image
            </label>
            <input
              type="file"
              id="school_image"
              {...register("school_image", { required: "School image is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.school_image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.school_image && <p className="text-red-500 text-sm mt-1">{errors.school_image.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
