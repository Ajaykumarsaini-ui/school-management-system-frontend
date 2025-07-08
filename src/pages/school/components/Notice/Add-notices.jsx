import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNotice } from "../../../../CustomHooks/useNotice";
import Button from "../../../../components/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Addnotices = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      audience: "all",
      category: "",
      message: "",
    },
  });

  const { add } = useNotice();

  // Handle Form Submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("audience", data.audience);
      formData.append("message", data.message);

      if (data.category) {
        formData.append("category", data.category);
      }

      if (data.attachment && data.attachment[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      const result = await add(formData).unwrap();
      toast.success("Notice added successfully!");
      console.log("Notice submitted:", result);
      reset();
    } catch (err) {
      console.error("Error submitting notice:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Notice</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Audience */}
        <div>
          <label className="block text-gray-700 mb-2">Audience</label>
          <select
            {...register("audience", { required: "Audience is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.audience && (
            <p className="text-red-500 text-sm">{errors.audience.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-2">Category (Optional)</label>
          <input
            type="text"
            {...register("category")}
            className="w-full px-3 py-2 border rounded focus:outline-none"
            placeholder="e.g. Academic"
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="block text-gray-700 mb-2">Attachment</label>
          <input
            type="file"
            {...register("attachment", {
              required: "Attachment is required",
              validate: {
                fileSize: (files) =>
                  files[0]?.size < 5 * 1024 * 1024 || "Max file size is 5MB",
              },
            })}
            className="w-full border rounded py-1 px-2 cursor-pointer text-gray-700"
          />
          {errors.attachment && (
            <p className="text-red-500 text-sm">{errors.attachment.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows="4"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            placeholder="Enter message..."
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="schedule-create-btn cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Notice"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Addnotices;
