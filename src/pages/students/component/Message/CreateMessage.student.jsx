import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./message.scss";
import { useNavigate } from "react-router";
import { useStudentmessage } from "../../../../CustomHooks/useStudentmessage"; // adjust path if needed

const Messagestudent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { add, loading, error } = useStudentmessage();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("message", data.message);
    if (data.attachment[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    try {
      await add(formData).unwrap(); // ✅ API endpoint
      toast.success("Message sent successfully!");
      reset();
      // navigate("/student/messages", { state: { newMessageAdded: true } });
    } catch (err) {
      console.error("Failed to send message:", err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="px-4 max-w-xl mx-auto">
      <ToastContainer position="top-right" autoClose={1000} />

      <motion.h1
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Messages
      </motion.h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Type your message here..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Attachment</label>
          <input
            type="file"
            {...register("attachment")}
            className="w-full p-2 border rounded"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </div>
  );
};

export default Messagestudent;
