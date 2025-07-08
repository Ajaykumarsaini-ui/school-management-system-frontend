import React, { useEffect } from "react";
import "./addleave.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTeacherleave } from "../../../../CustomHooks/useTeacherleave";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addleaveteacher = () => {
  const { add } = useTeacherleave();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    add(data).then(() => {
      toast.success("Leave request added successfully!");
      reset();
    });
  };

  return (
    <div className="addleave-form px-4 py-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6 text-center">Add Leave Request</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">From Date</label>
          <input
            type="date"
            className="w-full input input-bordered"
            {...register("fromDate", { required: "From date is required" })}
          />
          {errors.fromDate && (
            <p className="text-red-500 text-sm">{errors.fromDate.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">To Date</label>
          <input
            type="date"
            className="w-full input input-bordered"
            {...register("toDate", { required: "To date is required" })}
          />
          {errors.toDate && (
            <p className="text-red-500 text-sm">{errors.toDate.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Leave Reason</label>
          <textarea
            className="w-full input input-bordered h-24"
            {...register("leaveReason", {
              required: "Leave reason is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
          ></textarea>
          {errors.leaveReason && (
            <p className="text-red-500 text-sm">{errors.leaveReason.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          // disabled={loading}
        >
          Submit
          {/* {loading ? "Submitting..." : "Submit Leave"} */}
        </button>
      </form>
    </div>
  );
};

export default Addleaveteacher;

