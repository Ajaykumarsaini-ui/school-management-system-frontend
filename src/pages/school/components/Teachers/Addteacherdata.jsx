import React, { useEffect } from "react";
import "../../../../styles/school/teachers/addteachers.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTeachers } from "../../../../CustomHooks/useTeachers";
const Addteacherdata = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { teacher, loading, error, add } = useTeachers();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("teacher_name", data.teacher_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("qualification", data.qualification);
    formData.append("teacher_image", data.teacher_image[0]);

    add(formData)
      .then(() => {
        toast.success("Teacher added successfully");
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-xl font-semibold mb-4">Add Teacher Details</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-sm shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("teacher_name", { required: true })}
              placeholder="e.g. Suman Mehta"
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.teacher_name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Qualification
            </label>
            <input
              type="text"
              {...register("qualification", { required: true })}
              placeholder="e.g. M.Sc, B.Ed"
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.qualification && (
              <span className="text-red-500 text-sm">
                Qualification is required
              </span>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Age
            </label>
            <input
              type="number"
              min="3"
              max="80"
              {...register("age", { required: true })}
              placeholder="Please enter your age"
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.age && (
              <span className="text-red-500 text-sm">Age is required</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="e.g. suman@example.com"
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Please enter password"
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {/* Teacher Image */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Add photo
            </label>
            <input
              type="file"
              {...register("teacher_image", { required: true })}
              className="form-input cursor-pointer w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.teacher_image && (
              <span className="text-red-500 text-sm">Photo is required</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="form-select w-full border border-gray-300 px-2 py-1 rounded-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">Gender is required</span>
            )}
          </div>
        </div>

        <div className="text-center mt-6 mb-6">
          <Button type="submit" className="schedule-create-btn">
            {loading ? "Submitting..." : "Submit Teacher Details"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Addteacherdata;
